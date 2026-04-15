<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../config/database.php';

if (!isset($_GET['id'])) {
    echo json_encode([
        "error" => "ID manquant"
    ]);
    exit;
}

$user_id = intval($_GET['id']);

$sql = "SELECT 
    matricule,
    nom_prenom,
    email,
    telephone,
    nationalite,
    sexe,
    date_naissance,
    lieu_naissance,
    photo,
    document_justificatif,
    niveau_etude,
    dernier_etablissement,
    nom_parent,
    tel_parent,
    message_cefi,
    date_inscription
FROM inscrit
WHERE etudiant_id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "error" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$data = $result->fetch_assoc();

if (!$data) {
    http_response_code(404);
    echo json_encode([
        "error" => "Aucun étudiant trouvé"
    ]);
    exit;
}

echo json_encode($data);
?>