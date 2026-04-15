<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email)) {
    $cin = $conn->real_escape_string($data->cin);
    $nom = $conn->real_escape_string($data->nom);
    $email = $conn->real_escape_string($data->email);
    
    // Génération d'un jeton (token) unique pour l'email
    $token = bin2hex(random_bytes(32));

    $sql = "INSERT INTO enseignants (CIN, nom, email, token, status) VALUES ('$cin', '$nom', '$email', '$token', 0)";

    if($conn->query($sql)) {
        // --- ENVOI DE L'EMAIL ---
        $lien = "http://localhost:4200/setup-password/" . $token;
        $sujet = "Création de votre compte CEFI";
        $message = "Bonjour $nom,\n\nVotre compte a été créé par l'admin. Cliquez ici pour choisir votre mot de passe et activer votre compte :\n$lien";
        $headers = "From: admin@cefi.tn";

        mail($email, $sujet, $message, $headers);
        
        echo json_encode(["status" => "success", "message" => "Enseignant créé et email envoyé"]);
    }
}
?>