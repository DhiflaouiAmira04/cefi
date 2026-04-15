<?php

// 🔥 اظهار الاخطاء (وقت التطوير فقط)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 🔥 يجعل MySQL يعطي errors واضحة
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

require_once "../config/database.php";

// headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ التحقق من الاتصال
if (!$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

// ✅ قراءة JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

$sender = "admin";
$title = $data["title"] ?? "";
$message = $data["message"] ?? "";

try {

    // =========================
    // 🔥 SEND TO ALL
    // =========================
    if (!empty($data["send_all"])) {

        $result = $conn->query("SELECT etudiant_id FROM inscrit");

        if (!$result) {
            throw new Exception("Erreur récupération étudiants");
        }

        $stmt = $conn->prepare("
            INSERT INTO messages 
            (sender_role, receiver_id, title, message, created_at)
            VALUES (?, ?, ?, ?, NOW())
        ");

        while ($row = $result->fetch_assoc()) {

            if (empty($row['etudiant_id'])) continue;

            $stmt->bind_param(
                "siss",
                $sender,
                $row['etudiant_id'],
                $title,
                $message
            );

            $stmt->execute();
        }

        echo json_encode([
            "success" => true,
            "message" => "Message envoyé à tous"
        ]);
        exit;
    }

    // =========================
    // 🔥 SEND TO ONE
    // =========================
    $receiver = $data["receiver_id"] ?? null;

    if (!$receiver) {
        echo json_encode([
            "success" => false,
            "message" => "Receiver manquant"
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        INSERT INTO messages 
        (sender_role, receiver_id, title, message, created_at)
        VALUES (?, ?, ?, ?, NOW())
    ");

    $stmt->bind_param(
        "siss",
        $sender,
        $receiver,
        $title,
        $message
    );

    $stmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Message envoyé"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}