<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../config/database.php';

$sql = "SELECT 
    i.etudiant_id,
    i.cin,
    i.matricule,
    i.nom_prenom,
    i.email,
    i.telephone,
    i.diplome_id,
    d.nom_diplome
FROM inscrit i
LEFT JOIN diplomes d ON d.id = i.diplome_id
WHERE i.niveau = 2
ORDER BY d.nom_diplome, i.nom_prenom ASC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);