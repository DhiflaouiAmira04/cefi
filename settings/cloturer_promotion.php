<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $conn->beginTransaction();

    $annee = date("Y");

    // 1. CHECK IF niveau 2 EXISTS
    $check = $conn->prepare("SELECT COUNT(*) FROM inscrit WHERE niveau = 2");
    $check->execute();
    $countCheck = $check->fetchColumn();

    if ($countCheck == 0) {
        $conn->rollBack();
        echo json_encode([
            "status" => "info",
            "message" => "Aucun étudiant niveau 2 à clôturer"
        ]);
        exit;
    }

    // 2. ARCHIVE ONLY niveau 2
    $sqlArchive = "
        INSERT INTO archive_promotions 
        (cin, nom_prenom, matricule, diplome_id, niveau_archive, annee_scolaire)
        SELECT cin, nom_prenom, matricule, diplome_id, niveau, :annee
        FROM inscrit
        WHERE niveau = 2
    ";

    $stmt = $conn->prepare($sqlArchive);
    $stmt->execute([':annee' => $annee]);

    $count = $stmt->rowCount();

    // 3. DELETE ONLY niveau 2
    $sqlDelete = "DELETE FROM inscrit WHERE niveau = 2";
    $conn->exec($sqlDelete);

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "$count étudiants niveau 2 archivés et supprimés"
    ]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>