<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:4200"); // Plus précis que '*'
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once "../config/database.php";

// --- FONCTIONS JWT ---
function base64url_decode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) $data .= str_repeat('=', 4 - $remainder);
    return base64_decode(strtr($data, '-_', '+/'));
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// --- VERIFICATION DU TOKEN ---
$secret = "SECRET_KEY"; 
$headers = apache_request_headers();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = str_replace('Bearer ', '', $authHeader);

$payload = false;
$parts = explode('.', $token);

if (count($parts) === 3) {
    list($headerB64, $payloadB64, $signatureB64) = $parts;
    $expectedSig = base64url_encode(hash_hmac('sha256', "$headerB64.$payloadB64", $secret, true));
    
    if (hash_equals($expectedSig, $signatureB64)) {
        $payload = json_decode(base64url_decode($payloadB64));
        if (isset($payload->exp) && time() > $payload->exp) $payload = false;
    }
}

if (!$payload) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Session expirée ou invalide"]);
    exit;
}

// --- TRAITEMENT DU CHANGEMENT ---
$data = json_decode(file_get_contents("php://input"));
$oldPassword = $data->oldPassword ?? '';
$newPassword = $data->newPassword ?? '';
$userId = $payload->user_id; // Identifiant unique extrait du Token

if (empty($oldPassword) || empty($newPassword)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs"]);
    exit;
}

// 1. Vérifier l'ancien mot de passe (Tous rôles confondus)
$stmt = $conn->prepare("SELECT mot_de_passe, role FROM utilisateurs WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($oldPassword, $user['mot_de_passe'])) {
    
    // Vérification supplémentaire : si on veut empêcher un certain rôle de changer son mdp ici (Optionnel)
    // if ($user['role'] === 'un_role_special') { ... }

    // 2. Mettre à jour avec le nouveau Hash
    $newHashed = password_hash($newPassword, PASSWORD_BCRYPT);
    $upd = $conn->prepare("UPDATE utilisateurs SET mot_de_passe = ? WHERE id = ?");
    $upd->bind_param("si", $newHashed, $userId);
    
    if ($upd->execute()) {
        echo json_encode([
            "success" => true, 
            "message" => "Mot de passe modifié avec succès !",
            "role" => $user['role'] // On renvoie le rôle pour info
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erreur lors de la mise à jour"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "L'ancien mot de passe est incorrect"]);
}

$conn->close();
?>