<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

include("../config/database.php");

// Lecture des données envoyées par Angular
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)) {
    // Sécurisation de l'ID pour MySQLi
    $id = mysqli_real_escape_string($conn, $data->id);
    
    $sql = "DELETE FROM diplomes WHERE id = '$id'";
    
    if(mysqli_query($conn, $sql)) {
        echo json_encode(["status" => "success", "message" => "Diplôme supprimé"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => mysqli_error($conn)]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "ID manquant"]);
}