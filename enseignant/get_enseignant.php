<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

$sql = "SELECT * FROM enseignant ORDER BY id DESC";
$result = $conn->query($sql);

$enseignants = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $enseignants[] = $row;
    }
    echo json_encode($enseignants);
} else {
    echo json_encode([]); // Renvoie un tableau vide si aucun enseignant
}

$conn->close();
?>