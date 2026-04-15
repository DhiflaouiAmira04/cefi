<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->id) || !isset($data->nouveauStatut)) {
    echo json_encode(["status" => "error", "message" => "Données invalides"]);
    exit();
}

$id = (int)$data->id;
$statut = $data->nouveauStatut;

/* ================= GET ETUDIANT ================= */
$res = mysqli_query($conn, "SELECT * FROM etudiants WHERE id=$id");
$etudiant = mysqli_fetch_assoc($res);

if (!$etudiant) {
    echo json_encode(["status" => "error", "message" => "Étudiant non trouvé"]);
    exit();
}

/* ================= ACCEPT ================= */
if ($statut === 'Accepté') {

    // 1. update statut
    mysqli_query($conn, "UPDATE etudiants SET statut='Accepté' WHERE id=$id");

    // 2. check si déjà inscrit
    $check = mysqli_query($conn, "SELECT id FROM inscrit WHERE etudiant_id=$id");

    if (mysqli_num_rows($check) == 0) {

        // 3. matricule
        $year = date("y");

        $count = mysqli_fetch_assoc(
            mysqli_query($conn, "SELECT COUNT(*) as total FROM inscrit WHERE matricule LIKE '$year%'")
        )['total'] + 1;

        $matricule = $year . str_pad($count, 3, "0", STR_PAD_LEFT);

        // 4. INSERT ALL DATA (from etudiants → inscrit)
        $sql = "
        INSERT INTO inscrit (
            etudiant_id,
            matricule,
            cin,
            nom_prenom,
            email,
            telephone,
            nationalite,
            sexe,
            date_naissance,
            lieu_naissance,
            photo,
            niveau_etude,
            document_justificatif,
            dernier_etablissement,
            diplome_id,
            nom_parent,
            tel_parent,
            message_cefi,
            cin_delivre_le,
            etat_civil,
            adresse,
            annee_scolaire
        )
        SELECT 
            id,
            '$matricule',
            cin,
            nom_prenom,
            email,
            telephone,
            nationalite,
            sexe,
            date_naissance,
            lieu_naissance,
            photo,
            niveau_etude,
            document_justificatif,
            dernier_etablissement,
            diplome_id,
            nom_parent,
            tel_parent,
            message_cefi,
            cin_delivre_le,
            etat_civil,
            adresse,
            annee_scolaire
        FROM etudiants WHERE id=$id
        ";

        if (!mysqli_query($conn, $sql)) {
            echo json_encode([
                "status" => "error",
                "message" => mysqli_error($conn)
            ]);
            exit();
        }
    }

    echo json_encode([
        "status" => "accepted",
        "message" => "Étudiant accepté et inscrit avec succès"
    ]);
    exit();
}

/* ================= REFUS ================= */
if ($statut === 'Refusé') {

    mysqli_query($conn, "UPDATE etudiants SET statut='Refusé' WHERE id=$id");

    echo json_encode([
        "status" => "refused",
        "message" => "Étudiant refusé"
    ]);
    exit();
}

echo json_encode([
    "status" => "error",
    "message" => "Statut invalide"
]);
?>