<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

require_once "../config/database.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

try {

    // ✅ تحقق من id
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        echo json_encode([
            "success" => false,
            "message" => "Missing user id"
        ]);
        exit;
    }

    $id = intval($_GET['id']);

    // ✅ prepare
    $stmt = $conn->prepare("
        SELECT id, sender_role, title, message, is_read, created_at
        FROM messages
        WHERE receiver_id = ?
        ORDER BY id DESC
    ");

    // ✅ bind + execute
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    $messages = [];

    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    echo json_encode($messages);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}