<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

require_once "../config/database.php";
require_once "jwt_helper.php"; // <--- Assure-toi que tes fonctions generateJWT sont ici

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$secret = "SECRET_KEY"; // Doit être la même que dans change_password.php

$stmt = $conn->prepare("SELECT id, nom, email, mot_de_passe, role FROM utilisateurs WHERE email = ? AND statut = 'actif'");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result(); 
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['mot_de_passe'])) {
    
    // CRÉATION DU VRAI PAYLOAD JWT
    $payload = [
        "user_id" => $user['id'], // <--- Très important pour change_password.php
        "nom" => $user['nom'],
        "role" => strtolower($user['role']),
        "exp" => time() + (3600 * 24) // Expire dans 24 heures
    ];

    // GÉNÉRATION DU TOKEN JWT
    $token = generateJWT($payload, $secret); 
    
    echo json_encode([
        "success" => true,
        "token" => $token, // Envoie le JWT complet à Angular
        "role" => strtolower($user['role']),
        "nom" => $user['nom'],
        "id" => $user['id']
    ]);
} else {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
}
?>