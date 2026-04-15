<?php
require_once "../config/database.php";
$data = json_decode(file_get_contents("php://input"));

if($data->token && $data->password) {
    // Sécurité : on hache le mot de passe
    $passwordHache = password_hash($data->password, PASSWORD_DEFAULT);
    $token = $data->token;

    // On active l'enseignant qui possède ce token
    $sql = "UPDATE enseignant SET password = '$passwordHache', status = 1, token = NULL WHERE token = '$token'";
    
    if($conn->query($sql)) {
        echo json_encode(["status" => "success"]);
    }
}
?>