<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['cin'])) {
        echo json_encode(["status" => "error", "message" => "CIN manquant"]);
        exit;
    }

    $cin = $data['cin'];

    $sql = "UPDATE inscrit SET niveau = 2 WHERE cin = :cin";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':cin' => $cin]);

    echo json_encode([
        "status" => "success",
        "message" => "Étudiant passé en 2ème année"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>