
 <?php
// --- 1. HEADERS CORS (DOIVENT ÊTRE TOUT EN HAUT) ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// --- 2. GESTION DU PREFLIGHT OPTIONS (Pour Angular) ---
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- 3. INCLUSIONS ---
// Assure-toi que les chemins vers PHPMailer et ta config sont corrects
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';
require '../PHPMailer/Exception.php';
require_once "../config/database.php";

// --- 4. CONNEXION DB ---
$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Erreur DB : " . $e->getMessage()]); 
    exit;
}

// --- 5. RÉCUPÉRATION DES DONNÉES ---
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id) && !empty($data->email)) {
    // Génération du token sécurisé
    $token = bin2hex(random_bytes(32));
    $expires = date("Y-m-d H:i:s", strtotime('+24 hours'));

    // Mise à jour de l'étudiant avec le token
    $query = "UPDATE inscrit SET token = :token, token_expires = :expires WHERE id = :id";
    $stmt = $conn->prepare($query);

    if($stmt->execute(['token' => $token, 'expires' => $expires, 'id' => $data->id])) {
        
        $mail = new PHPMailer(true);

        try {
            // --- Configuration Serveur SMTP ---
            $mail->SMTPDebug = 0; // Laisser à 0 pour ne pas casser le JSON
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'jedaiinsaf@gmail.com';
            $mail->Password   =  'hsvlodfuzlhdoknu'; 
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            // --- Destinataire ---
            $mail->setFrom('jedaiinsaf@gmail.com', 'Admin CEFI');
            $mail->addAddress($data->email);

            // --- Contenu du mail personnalisé ---
            $link = "http://localhost:4200/set-password?token=" . $token;
            $mail->isHTML(true);
            $mail->Subject = 'Bienvenue chez CEFI - Activation de compte';
            
            // Ton message personnalisé
            $mail->Body = "
                <div style='font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;'>
                    <h2 style='color: #2c3e50;'>Bonjour cher étudiant,</h2>
                    <p>Nous avons le plaisir de vous informer que <strong>nous vous avons accepté chez CEFI</strong> !</p>
                    <p>Vous allez effectuer votre formation avec nous. Pour commencer, vous devez activer votre compte.</p>
                    <p>Veuillez cliquer sur le bouton ci-dessous pour configurer votre mot de passe :</p>
                    <div style='text-align: center; margin: 30px 0;'>
                        <a href='$link' style='background-color: #27ae60; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>
                            Créer mon mot de passe
                        </a>
                    </div>
                    <p>Ce lien est valable pendant 24 heures.</p>
                    <hr style='border: 0; border-top: 1px solid #eee;'>
                    <p>Cordialement,<br>
                    <strong>L'équipe CEFI</strong><br>
                    Merci de nous avoir rejoints !</p>
                </div>
            ";

            $mail->send();
            echo json_encode(["status" => "success", "message" => "Email envoyé avec succès"]);
            
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Erreur Mailer: {$mail->ErrorInfo}"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de la génération du token"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Données incomplètes (ID ou Email manquant)"]);
}
?>