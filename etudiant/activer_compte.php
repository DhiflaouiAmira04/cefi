<?php
// 1. HEADERS CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php"; 

$json = file_get_contents("php://input");
$data = json_decode($json);

if (empty($data->token) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Données incomplètes."]);
    exit;
}

try {
    // 2. RECHERCHE DE L'ÉTUDIANT (Syntaxe MySQLi avec ?)
    $query = "SELECT nom_prenom, email FROM inscrit WHERE token = ? AND token_expires > NOW() LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $data->token);
    $stmt->execute();
    $result = $stmt->get_result();
    $etudiant = $result->fetch_assoc();

    if ($etudiant) {
        // 3. TRANSACTION
        $conn->begin_transaction();

        $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);

        // 4. INSERTION/UPDATE UTILISATEUR
        // On insère 'nom_prenom' dans la colonne 'nom'
        $sqlUser = "INSERT INTO utilisateurs (nom, email, mot_de_passe, role, statut) 
                    VALUES (?, ?, ?, 'etudiant', 'actif')
                    ON DUPLICATE KEY UPDATE mot_de_passe = ?, statut = 'actif'";
        
        $stmtUser = $conn->prepare($sqlUser);
        // On lie les 4 paramètres (?) : nom, email, password, password(pour le update)
        $stmtUser->bind_param("ssss", $etudiant['nom_prenom'], $etudiant['email'], $hashedPassword, $hashedPassword);
        $stmtUser->execute();

        $updateEtudiant = "UPDATE inscrit 
        SET token = NULL, token_expires = NULL 
        WHERE email = ?";

        $stmtEtud = $conn->prepare($updateEtudiant);
        $stmtEtud->bind_param("s", $etudiant['email']);
        $stmtEtud->execute();

        // 6. VALIDATION
        $conn->commit();

        echo json_encode(["status" => "success", "message" => "Félicitations ! Votre compte est activé."]);

    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Le lien est invalide ou a expiré."]);
    }

} catch (Exception $e) {
    // En MySQLi, on vérifie simplement si la connexion existe pour rollback
    if (isset($conn)) { $conn->rollback(); }
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erreur SQL : " . $e->getMessage()]);
}
?>