<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';
require '../PHPMailer/Exception.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'jedaiinsaf@gmail.com';
    $mail->Password   = 'hsvlodfuzlhdoknu'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('jedaiinsaf@gmail.com', 'Admin CEFI');
    $mail->addAddress('ton_email@test.com');

    $mail->isHTML(true);
    $mail->Subject = 'Test Email PHPMailer';
    $mail->Body    = 'Ceci est un test.';

    $mail->send();
    echo "Email envoyé avec succès !";

} catch (Exception $e) {
    echo "Erreur PHPMailer : " . $mail->ErrorInfo;
}
