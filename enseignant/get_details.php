<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once "../config/database.php";

$cin = $_GET['cin'] ?? null;

if ($cin) {
    $sql = "SELECT * FROM enseignant WHERE CIN = '$cin' LIMIT 1";
    $result = $conn->query($sql);
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Introuvable"]);
    }
}
$conn->close();
?>