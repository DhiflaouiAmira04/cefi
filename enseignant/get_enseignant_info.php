<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../config/database.php";

// On récupère l'email ou l'ID envoyé en paramètre (ou via le Token)
$email = $_GET['email'] ?? ''; 

if (empty($email)) {
    echo json_encode(["success" => false, "message" => "Email manquant"]);
    exit;
}

$sql = "SELECT CIN, nom, email, telephone, adresse, datedenaissance, specialite, diplome FROM enseignant WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($enseignant = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "data" => $enseignant]);
} else {
    echo json_encode(["success" => false, "message" => "Enseignant non trouvé"]);
}
?>