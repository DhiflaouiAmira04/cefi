<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/database.php";

$id = $_POST['id'] ?? null;

if (!$id) {
    echo json_encode([
        "status" => "error",
        "message" => "ID manquant"
    ]);
    exit;
}

$sql = "DELETE FROM evenement WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>