<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';
require '../PHPMailer/Exception.php';
require_once "../config/database.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    // Extraction flexible des données (accepte cin, CIN, Nom, nom, etc.)
    $email = $data['email'] ?? null;
    $nom   = $data['nom']   ?? $data['Nom'] ?? null;
    $cin   = $data['cin']   ?? $data['CIN'] ?? null;

    if (!$email || !$nom || !$cin) {
        throw new Exception("Données manquantes. Reçu : " . json_encode($data));
    }

    $token = bin2hex(random_bytes(32));

    // UPDATE SQL : Utilisation des colonnes de ta table
    $sql = "UPDATE enseignant SET token = ?, status = 0 WHERE CIN = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) throw new Exception("Erreur SQL : " . $conn->error);

    $stmt->bind_param("si", $token, $cin);
    $stmt->execute();

    if ($stmt->affected_rows === 0) {
        throw new Exception("Aucun utilisateur trouvé avec le CIN : $cin");
    }

    // ENVOI MAIL
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'jedaiinsaf@gmail.com';
    $mail->Password   = 'hsvlodfuzlhdoknu'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->SMTPOptions = ['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true]];

    $mail->setFrom('jedaiinsaf@gmail.com', 'Admin CEFI');
    $mail->addAddress($email, $nom);
    $mail->isHTML(true);
    $mail->Subject = 'Activation de votre compte';
    $mail->Body    = "<h3>Bonjour $nom</h3><p>Cliquez ici : <a href='http://localhost:4200/setup-password/$token'>Activer mon compte</a></p>";

    $mail->send();

    echo json_encode(["success" => true, "message" => "Email envoyé avec succès !"]);

} catch (Exception $e) {
    http_response_code(400); // Important pour qu'Angular capte l'erreur
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}