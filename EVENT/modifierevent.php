<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/database.php";

$id = $_POST['id'];
$titre = $_POST['titre'];
$lieu = $_POST['lieu'];
$depart = $_POST['depart'];
$fin = $_POST['fin'];
$description = $_POST['description'];

$sql = "UPDATE evenement
        SET titre=?, lieu=?, depart=?, fin=?, description=? 
        WHERE id=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $titre, $lieu, $depart, $fin, $description, $id);

$stmt->execute();

echo json_encode(["status" => "success"]);
?>