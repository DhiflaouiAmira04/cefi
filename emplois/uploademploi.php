<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/database.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_FILES['file'])) {
    echo json_encode(["error" => "file missing"]);
    exit;
}

$diplome_id = $_POST['diplome_id'] ?? null;
$titre = $_POST['titre'] ?? null;

$file = $_FILES['file'];

$targetDir = __DIR__ . "/uploads/";

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$fileName = time() . "_" . basename($file["name"]);
$targetFile = $targetDir . $fileName;

if (move_uploaded_file($file["tmp_name"], $targetFile)) {

    $sql = "INSERT INTO emplois (diplome_id, titre, fichier)
            VALUES (?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iss", $diplome_id, $titre, $fileName);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "sql_error", "msg" => $stmt->error]);
    }

} else {
    echo json_encode(["status" => "upload_failed"]);
}
?>