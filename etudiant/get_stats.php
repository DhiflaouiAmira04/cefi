<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    
    // Compter les étudiants
    $stmtEtud = $pdo->query("SELECT COUNT(*) FROM utilisateurs WHERE role = 'etudiant'");
    $nbEtudiants = $stmtEtud->fetchColumn();

    // Compter les enseignants
    $stmtProf = $pdo->query("SELECT COUNT(*) FROM utilisateurs WHERE role = 'enseignant'");
    $nbEnseignants = $stmtProf->fetchColumn();

    echo json_encode([
        "nbEtudiants" => $nbEtudiants,
        "nbEnseignants" => $nbEnseignants
    ]);

} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>