<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!isset($data->token) || !isset($data->password)){
    http_response_code(400);
    echo json_encode(["message"=>"Données manquantes"]);
    exit;
}

$token = $conn->real_escape_string($data->token);
$password = password_hash($data->password, PASSWORD_DEFAULT);

// Vérifier token et que l'enseignant n'est pas déjà actif
$sql = "SELECT * FROM enseignant WHERE token='$token' AND statut='inactif'";
$res = $conn->query($sql);

if($res->num_rows > 0){
    $update = "UPDATE enseignant SET mot_de_passe='$password', statut='actif', token=NULL WHERE token='$token'";
    if($conn->query($update)){
        echo json_encode(["status"=>"success","message"=>"Mot de passe défini !"]);
    } else {
        http_response_code(500);
        echo json_encode(["message"=>"Erreur lors de l'enregistrement du mot de passe"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message"=>"Token invalide ou compte déjà activé"]);
}

$conn->close();
?>
