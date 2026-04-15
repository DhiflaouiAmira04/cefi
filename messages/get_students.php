<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

$niveau = $_GET['niveau'] ?? null;
$classe = $_GET['classe'] ?? null;

$sql = "SELECT nom_prenom, cin, email, niveau, classe FROM inscrit WHERE 1=1";
$params = [];

if ($niveau) {
    $sql .= " AND niveau = ?";
    $params[] = $niveau;
}

if ($classe) {
    $sql .= " AND classe = ?";
    $params[] = $classe;
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

$students = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "status" => "success",
    "count" => count($students),
    "data" => $students
]);
?>