<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->nom_diplome)) {
    $nom = mysqli_real_escape_string($conn, $data->nom_diplome);
    $sql = "INSERT INTO diplomes (nom_diplome) VALUES ('$nom')";
    
    if(mysqli_query($conn, $sql)) {
        echo json_encode([
            "id" => mysqli_insert_id($conn),
            "nom_diplome" => $data->nom_diplome
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => mysqli_error($conn)]);
    }
}