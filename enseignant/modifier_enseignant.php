<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

// ✅ نستعمل POST بدل JSON
if (!empty($_POST['id'])) {

    $id = $_POST['id'];
    $cin = $_POST['cin'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $specialite = $_POST['specialite'];
    $diplome = $_POST['diplome'];

    // ✅ FIX date
    $datedenaissance = (!empty($_POST['datedenaissance']) && $_POST['datedenaissance'] != "0000-00-00")
        ? $_POST['datedenaissance']
        : null;

    $sql = "UPDATE enseignant 
            SET CIN = ?, nom = ?, email = ?, datedenaissance = ?, specialite = ?, diplome = ?
            WHERE id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "isssssi",
        $cin,
        $nom,
        $email,
        $datedenaissance,
        $specialite,
        $diplome,
        $id
    );

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Modification réussie"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => $stmt->error
        ]);
    }

    $stmt->close();

} else {
    echo json_encode([
        "status" => "error",
        "message" => "ID manquant"
    ]);
}

$conn->close();
?>