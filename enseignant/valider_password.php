<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once "../config/database.php"; 

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$token = $data['token'] ?? null;
$password = $data['password'] ?? null;

if (!$token || !$password) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données manquantes"]);
    exit;
}

try {
    // 1. CHERCHER dans 'enseignant' (on a remplacé ensig par enseignant)
    $stmt = $conn->prepare("SELECT nom, email FROM enseignant WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $enseignant = $result->fetch_assoc();

    if (!$enseignant) {
        throw new Exception("Lien invalide ou expiré.");
    }

    $nom = $enseignant['nom'];
    $email = $enseignant['email'];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // 2. INSERER dans 'utilisateurs'
    $sqlUser = "INSERT INTO utilisateurs (nom, email, mot_de_passe, role, statut) 
                VALUES (?, ?, ?, 'enseignant', 'actif')
                ON DUPLICATE KEY UPDATE mot_de_passe = VALUES(mot_de_passe), statut = 'actif'";
    
    $stmtUser = $conn->prepare($sqlUser);
    $stmtUser->bind_param("sss", $nom, $email, $hashedPassword);
    
    if ($stmtUser->execute()) {
        // 3. UPDATE 'enseignant' (on utilise le même nom de table partout)
        $updateSql = "UPDATE enseignant SET status = 1, token = NULL WHERE token = ?";
        $stmtUpdate = $conn->prepare($updateSql);
        $stmtUpdate->bind_param("s", $token);
        $stmtUpdate->execute();

        echo json_encode(["success" => true, "message" => "Activation réussie"]);
    } else {
        throw new Exception("Erreur lors de la création de l'accès utilisateur.");
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>