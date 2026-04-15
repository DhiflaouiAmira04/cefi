<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php";

$input = file_get_contents("php://input");
$data = json_decode($input);

if (!$data) {
    http_response_code(400);
    echo json_encode(["message" => "Données JSON manquantes"]);
    exit;
}

// Extraction et conversion forcée selon votre table (CIN est int(11))
$cin       = isset($data->cin) ? intval($data->cin) : 0;
$nom       = isset($data->nom) ? substr(trim($data->nom), 0, 50) : null;
$email     = isset($data->email) ? substr(trim($data->email), 0, 50) : null;
$telephone = isset($data->telephone) ? substr(trim($data->telephone), 0, 50) : null;
$adresse   = isset($data->adresse) ? substr(trim($data->adresse), 0, 50) : null;
$specialite= isset($data->specialite) ? substr(trim($data->specialite), 0, 50) : null;
$diplome   = isset($data->diplome) ? substr(trim($data->diplome), 0, 50) : null;

// Gestion de la date : si vide, envoyer NULL, sinon formater
$datedenaissance = (!empty($data->datedenaissance)) ? $data->datedenaissance : null;

if ($cin === 0 || empty($nom)) {
    http_response_code(422);
    echo json_encode(["message" => "CIN et Nom sont obligatoires"]);
    exit;
}

$sql = "INSERT INTO enseignant (CIN, nom, email, telephone, adresse, datedenaissance, specialite, diplome) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if ($stmt) {
    // i = int (pour CIN), s = string (pour le reste)
    $stmt->bind_param("isssssss", $cin, $nom, $email, $telephone, $adresse, $datedenaissance, $specialite, $diplome);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Enseignant ajouté avec succès"]);
    } else {
        http_response_code(500);
        // On renvoie l'erreur SQL réelle pour comprendre le crash
        echo json_encode(["message" => "Erreur SQL: " . $stmt->error]);
    }
    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erreur préparation: " . $conn->error]);
}
$conn->close();
?>