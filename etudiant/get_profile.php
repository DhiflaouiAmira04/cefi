<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/database.php");

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

$user_id = intval($_GET['id']);

$sql = "SELECT id, nom, email, role, statut, created_at 
        FROM utilisateurs 
        WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

echo json_encode($result->fetch_assoc());