<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../config/database.php";

$uploadDir = "../../uploads/"; // Chemin vers ton dossier de stockage

// Gestion de la Photo
$photoPath = "";
if (isset($_FILES['photo'])) {
    $photoPath = time() . "_" . $_FILES['photo']['name'];
    move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $photoPath);
}

// Gestion du Document
$docPath = "";
if (isset($_FILES['document_justificatif'])) {
    $docPath = time() . "_" . $_FILES['document_justificatif']['name'];
    move_uploaded_file($_FILES['document_justificatif']['tmp_name'], $uploadDir . $docPath);
}

$sql = "INSERT INTO etudiants (
    cin, nom_prenom, email, telephone, nationalite, sexe, 
    date_naissance, lieu_naissance, photo, niveau_etude, 
    document_justificatif, dernier_etablissement, diplome_id, 
    nom_parent, tel_parent, message_cefi, date_preinscription
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);

$stmt->bind_param("ssssssssssssisss", 
    $_POST['cin'], $_POST['nom_prenom'], $_POST['email'], $_POST['telephone'], 
    $_POST['nationalite'], $_POST['sexe'], $_POST['date_naissance'], $_POST['lieu_naissance'], 
    $photoPath, $_POST['niveau_etude'], $docPath, $_POST['dernier_etablissement'], 
    $_POST['diplome_id'], $_POST['nom_parent'], $_POST['tel_parent'], $_POST['message_cefi']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $conn->error]);
}
?>