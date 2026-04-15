<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/database.php");

$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// 2. Récupération des données textuelles
$cin           = mysqli_real_escape_string($conn, $_POST['cin'] ?? '');
$nomPrenom     = mysqli_real_escape_string($conn, $_POST['nomPrenom'] ?? '');
$email         = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
$telephone     = mysqli_real_escape_string($conn, $_POST['telephone'] ?? '');
$nationalite   = mysqli_real_escape_string($conn, $_POST['nationalite'] ?? '');
$sexe          = mysqli_real_escape_string($conn, $_POST['sexe'] ?? '');
$dateN         = mysqli_real_escape_string($conn, $_POST['dateNaissance'] ?? '');
$lieuN         = mysqli_real_escape_string($conn, $_POST['lieuNaissance'] ?? '');
$niveau        = mysqli_real_escape_string($conn, $_POST['niveauEtude'] ?? '');
$diplome_id    = mysqli_real_escape_string($conn, $_POST['diplome_id'] ?? '');
$etab          = mysqli_real_escape_string($conn, $_POST['dernierEtablissement'] ?? '');
$nomParent     = mysqli_real_escape_string($conn, $_POST['nomParent'] ?? '');
$telParent     = mysqli_real_escape_string($conn, $_POST['telParent'] ?? '');
$message       = mysqli_real_escape_string($conn, $_POST['message'] ?? '');

// --- NOUVEAUX CHAMPS AJOUTÉS ICI ---
$adresse       = mysqli_real_escape_string($conn, $_POST['adresse'] ?? '');
$cin_delivre   = mysqli_real_escape_string($conn, $_POST['cin_delivre_le'] ?? '');
$etat_civil    = mysqli_real_escape_string($conn, $_POST['etat_civil'] ?? '');

// 3. Gestion Upload PHOTO
$photoName = "";
if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
    $photoExtension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $photoName = "photo_" . $cin . "_" . time() . "." . $photoExtension;
    move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $photoName);
}

// 4. Gestion Upload DOCUMENT
$docName = "";
if (isset($_FILES['document']) && $_FILES['document']['error'] == 0) {
    $docExtension = pathinfo($_FILES['document']['name'], PATHINFO_EXTENSION);
    $docName = "doc_" . $cin . "_" . time() . "." . $docExtension;
    move_uploaded_file($_FILES['document']['tmp_name'], $uploadDir . $docName);
}

// 5. Requête SQL (Correction des apostrophes et ajout des champs)
$sql = "INSERT INTO etudiants (
    cin, nom_prenom, email, telephone, nationalite, sexe, 
    date_naissance, lieu_naissance, photo, niveau_etude, 
    document_justificatif, dernier_etablissement, diplome_id, 
    nom_parent, tel_parent, message_cefi, adresse, cin_delivre_le, etat_civil
) VALUES (
    '$cin', '$nomPrenom', '$email', '$telephone', '$nationalite', '$sexe',
    '$dateN', '$lieuN', '$photoName', '$niveau', 
    '$docName', '$etab', " . ($diplome_id ? $diplome_id : "NULL") . ", 
    '$nomParent', '$telParent', '$message', '$adresse', '$cin_delivre', '$etat_civil'
)";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success", "message" => "Préinscription enregistrée avec succès !"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
}
?>