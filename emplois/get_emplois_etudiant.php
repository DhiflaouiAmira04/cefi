<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/database.php";

// 🔒 check id
if (!isset($_GET['etudiant_id'])) {
    echo json_encode([]);
    exit;
}

$etudiant_id = intval($_GET['etudiant_id']);

// ✅ 1. نجيب diplome + niveau من inscrit
$sqlStudent = "
    SELECT diplome_id, niveau 
    FROM inscrit 
    WHERE etudiant_id = $etudiant_id
";

$resStudent = mysqli_query($conn, $sqlStudent);
$student = mysqli_fetch_assoc($resStudent);

if (!$student) {
    echo json_encode([]);
    exit;
}

$diplome_id = $student['diplome_id'];
$niveau = $student['niveau'];

// ✅ 2. نجيب emplois حسب diplôme (و تنجم تزيد niveau كان حبيت)
$sql = "
    SELECT id, titre, fichier, created_at
    FROM emplois
    WHERE diplome_id = $diplome_id
    ORDER BY id DESC
";

$result = mysqli_query($conn, $sql);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>