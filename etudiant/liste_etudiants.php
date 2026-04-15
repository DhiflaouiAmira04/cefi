<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/database.php");

$sql = "SELECT e.*, d.nom_diplome 
        FROM etudiants e 
        LEFT JOIN diplomes d ON e.diplome_id = d.id 
        ORDER BY e.date_preinscription DESC";

$result = mysqli_query($conn, $sql);
$etudiants = [];

while($row = mysqli_fetch_assoc($result)) {
    $etudiants[] = $row;
}

echo json_encode($etudiants);