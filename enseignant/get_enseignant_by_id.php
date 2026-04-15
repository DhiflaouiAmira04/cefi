<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once "../config/database.php";

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM enseignant WHERE id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Non trouvé"]);
    }
}
$conn->close();
?>