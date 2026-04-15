<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

// Récupérer les données
$json = file_get_contents("php://input");
$data = json_decode($json);

if(isset($data->photo) && isset($data->cin)) {
    $folderPath = "../uploads/"; // Vérifiez que ce dossier existe vraiment !
    
    // Nettoyage : On enlève l'en-tête "data:image/png;base64,"
    $imageData = $data->photo;
    if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
        $imageData = substr($imageData, strpos($imageData, ',') + 1);
        $extension = strtolower($type[1]); // png, jpg, jpeg...
        $imageData = base64_decode($imageData);
    } else {
        echo json_encode(["message" => "Format d'image invalide"]);
        exit;
    }

    // Nom de fichier unique
    $fileName = "img_" . $data->cin . "_" . time() . "." . $extension;
    $filePath = $folderPath . $fileName;

    if(file_put_contents($filePath, $imageData)) {
        // Mettre à jour la base de données
        $sql = "UPDATE enseignant SET photo = '$fileName' WHERE CIN = '$data->cin'";
        if($conn->query($sql)) {
            echo json_encode(["status" => "success", "photo" => $fileName]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erreur SQL"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Impossible d'écrire dans /uploads"]);
    }
}
?>