<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../config/database.php");

$cin = $_POST['cin'] ?? '';

if(empty($cin)){
    echo json_encode(["status"=>"error", "message"=>"CIN manquant"]);
    exit;
}

$nom_prenom = $_POST['nom_prenom'] ?? '';
$email = $_POST['email'] ?? '';
$telephone = $_POST['telephone'] ?? '';
$date_naissance = $_POST['date_naissance'] ?? '';
$lieu_naissance = $_POST['lieu_naissance'] ?? '';
$nationalite = $_POST['nationalite'] ?? '';
$sexe = $_POST['sexe'] ?? '';
$niveau_etude = $_POST['niveau_etude'] ?? '';
$dernier_etablissement = $_POST['dernier_etablissement'] ?? '';
$diplome_id = $_POST['diplome_id'] ?? '';
$nom_parent = $_POST['nom_parent'] ?? '';
$tel_parent = $_POST['tel_parent'] ?? '';
$message_cefi = $_POST['message_cefi'] ?? '';
$adresse = $_POST['adresse'] ?? '';
$etat_civil = $_POST['etat_civil'] ?? '';
$annee_scolaire = $_POST['annee_scolaire'] ?? '';
$cin_delivre_le = $_POST['cin_delivre_le'] ?? '';
$matricule = $_POST['matricule'] ?? '';
$statut = $_POST['statut'] ?? '';

// FILES
$photo = null;
$document = null;

if(isset($_FILES['photo']) && $_FILES['photo']['error'] == 0){
    $photo = time().'_'.basename($_FILES['photo']['name']);
    move_uploaded_file($_FILES['photo']['tmp_name'], '../uploads/'.$photo);
}

if(isset($_FILES['document']) && $_FILES['document']['error'] == 0){
    $document = time().'_'.basename($_FILES['document']['name']);
    move_uploaded_file($_FILES['document']['tmp_name'], '../uploads/'.$document);
}

// SQL SAFE UPDATE
$sql = "UPDATE inscrit SET
nom_prenom=?,
email=?,
telephone=?,
date_naissance=?,
lieu_naissance=?,
nationalite=?,
sexe=?,
niveau_etude=?,
dernier_etablissement=?,
diplome_id=?,
nom_parent=?,
tel_parent=?,
message_cefi=?,
adresse=?,
etat_civil=?,
annee_scolaire=?,
cin_delivre_le=?,
matricule=?,
statut=?" .
($photo ? ", photo=?" : "") .
($document ? ", document_justificatif=?" : "") .
" WHERE cin=?";

$stmt = $conn->prepare($sql);

// bind dynamic params
$params = [
$nom_prenom,
$email,
$telephone,
$date_naissance,
$lieu_naissance,
$nationalite,
$sexe,
$niveau_etude,
$dernier_etablissement,
$diplome_id,
$nom_parent,
$tel_parent,
$message_cefi,
$adresse,
$etat_civil,
$annee_scolaire,
$cin_delivre_le,
$matricule,
$statut
];

if($photo) $params[] = $photo;
if($document) $params[] = $document;

$params[] = $cin;

$types = str_repeat("s", count($params));

$stmt->bind_param($types, ...$params);

if($stmt->execute()){
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode(["status"=>"error","message"=>$stmt->error]);
}
?>