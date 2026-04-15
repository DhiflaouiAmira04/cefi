<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// On inclut ton fichier qui utilise mysqli
require_once "../config/database.php"; 

try {
    // 1. On vérifie si $conn existe (puisque c'est le nom dans ton database.php)
    if (!isset($conn)) {
        throw new Exception("La variable de connexion \$conn est introuvable.");
    }

    // 2. Requête version MySQLi (différente de PDO)
    $query = "SELECT COUNT(*) as total FROM etudiants";
    $result = $conn->query($query);

    if (!$result) {
        throw new Exception("Erreur dans la requête : " . $conn->error);
    }

    // 3. Récupération du résultat
    $row = $result->fetch_assoc();

    echo json_encode([
        "status" => "success",
        "total_inscriptions" => (int)$row['total']
    ]);

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>