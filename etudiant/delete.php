<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


include("../config/database.php");

// Naqraw el ID elli jé mel URL wala mel Request
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "DELETE FROM etudiants WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    
    if ($stmt->execute(['id' => $id])) {
        echo json_encode(["message" => "Suppression réussie"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erreur lors de la suppression"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "ID manquant"]);
}
?>