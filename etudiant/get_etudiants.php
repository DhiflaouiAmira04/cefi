<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/database.php");

if(isset($_GET['id'])){

    $id = intval($_GET['id']);

    $query = "SELECT * FROM inscrit WHERE id = $id LIMIT 1";
    $result = mysqli_query($conn, $query);

    if(mysqli_num_rows($result) > 0){
        $etudiant = mysqli_fetch_assoc($result);
        echo json_encode($etudiant);
    } else {
        echo json_encode(["message" => "Not found"]);
    }

} else {
    echo json_encode(["message" => "ID manquant"]);
}
?>