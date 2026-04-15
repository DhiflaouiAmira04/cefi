<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }

// Lecture du flux d'entrée
$json = file_get_contents("php://input");
$data = json_decode($json);

// --- TEST DE RÉCEPTION ---
if (!$data || empty($data->token) || empty($data->password)) {
    http_response_code(400); // On renvoie un code erreur pour qu'Angular aille dans 'error'
    echo json_encode([
        "status" => "error", 
        "message" => "Données reçues vides ou mal formées",
        "debug_raw_input" => $json // Utile pour voir ce qui arrive vraiment
    ]);
    exit();
}

require_once "../config/database.php"; 

try {
    // Connexion (Assure-toi que ces paramètres sont corrects)
    $conn = new PDO("mysql:host=localhost;dbname=cefi;charset=utf8", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 1. Chercher l'utilisateur avec le token
    $stmt = $conn->prepare("SELECT id FROM utilisateurs WHERE token = ?");
    $stmt->execute([$data->token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // 2. Hachage et mise à jour
        $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);
        
        $update = $conn->prepare("UPDATE utilisateurs SET mot_de_passe = ?, token = NULL, token_expires = NULL WHERE id = ?");
        $update->execute([$hashedPassword, $user['id']]);

        echo json_encode(["status" => "success", "message" => "Mot de passe mis à jour"]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Le lien est invalide ou a expiré."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erreur DB: " . $e->getMessage()]);
}
?>