<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../config/database.php");

// Avec MySQLi, on fait comme ça :
$sql = "SELECT id, nom_diplome FROM diplomes ORDER BY id DESC";
$result = mysqli_query($conn, $sql);

if ($result) {
    $rows = [];
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
} else {
    http_response_code(500);
    echo json_encode(["error" => mysqli_error($conn)]);
}