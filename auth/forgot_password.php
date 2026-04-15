<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';
require '../PHPMailer/Exception.php';

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $input = file_get_contents("php://input");
    $data = json_decode($input);

    if(!empty($data->email)) {
        $email = $data->email;

        // CORRECTION : Table 'utilisateurs' au lieu de 'etudiants'
        $stmt = $conn->prepare("SELECT id FROM utilisateurs WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if($user) {
            $token = bin2hex(random_bytes(32));
            $expires = date("Y-m-d H:i:s", strtotime('+1 hour'));

            // CORRECTION : Table 'utilisateurs'
            $upd = $conn->prepare("UPDATE utilisateurs SET token = ?, token_expires = ? WHERE email = ?");
            $upd->execute([$token, $expires, $email]);

            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'jedaiinsaf@gmail.com';
            $mail->Password   = 'hsvlodfuzlhdoknu'; 
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom('jedaiinsaf@gmail.com', 'CEFI Support');
            $mail->addAddress($email);

            $link = "http://localhost:4200/reset-password?token=" . $token;
            $mail->isHTML(true);
            $mail->Subject = 'Reinitialisation de votre mot de passe - CEFI';
            $mail->Body    = "<h2>Réinitialisation</h2><p>Cliquez ici : <a href='$link'>Changer mon mot de passe</a></p>";

            $mail->send();
            echo json_encode(["status" => "success", "message" => "Email envoyé"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Cet e-mail n'existe pas."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Email manquant."]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Erreur DB: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Erreur Mailer: " . $e->getMessage()]);
}
?>