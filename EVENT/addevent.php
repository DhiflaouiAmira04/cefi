<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/database.php";

$titre = $_POST['titre'] ?? '';
$lieu = $_POST['lieu'] ?? '';
$depart = $_POST['depart'] ?? null;
$fin = $_POST['fin'] ?? null;
$description = $_POST['description'] ?? '';

$photo = null;

// 📸 upload image
if (!empty($_FILES['photo']['name'])) {

    $photo = time() . "_" . basename($_FILES['photo']['name']);

    $uploadDir = __DIR__ . "/../uploads/";
    $uploadPath = $uploadDir . $photo;

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (!move_uploaded_file($_FILES['photo']['tmp_name'], $uploadPath)) {
        echo json_encode([
            "status" => "error",
            "message" => "Upload failed"
        ]);
        exit;
    }
}

// 💾 INSERT
$sql = "INSERT INTO evenement (titre, lieu, depart, fin, photo, description)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssssss", $titre, $lieu, $depart, $fin, $photo, $description);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}
?>