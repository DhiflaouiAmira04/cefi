<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php";

$diplome_id = $_POST['diplome_id'] ?? null;

if (!$diplome_id) {
    echo json_encode([
        "status" => "error",
        "message" => "diplome_id manquant"
    ]);
    exit;
}

// ✅ 1. نجيب آخر emploi حسب diplôme
$sql = "SELECT id FROM emplois 
        WHERE diplome_id = $diplome_id 
        ORDER BY id DESC LIMIT 1";

$result = mysqli_query($conn, $sql);
$emploi = mysqli_fetch_assoc($result);

if (!$emploi) {
    echo json_encode([
        "status" => "error",
        "message" => "Aucun emploi trouvé"
    ]);
    exit;
}

$emploi_id = $emploi['id'];

// ✅ 2. نجيب الطلبة من inscrit (niveau 1 فقط)
$sqlStudents = "
    SELECT etudiant_id 
    FROM inscrit 
    WHERE diplome_id = $diplome_id 
    AND niveau = 1
";

$students = mysqli_query($conn, $sqlStudents);

$count = 0;

// ✅ 3. نربط emploi بالطلبة
while ($s = mysqli_fetch_assoc($students)) {

    $student_id = $s['etudiant_id'];

    mysqli_query($conn, "
        INSERT INTO student_emplois (student_id, emploi_id)
        VALUES ($student_id, $emploi_id)
    ");

    $count++;
}

// ✅ response
echo json_encode([
    "status" => "success",
    "message" => "Envoyé à $count étudiants (niveau 1)"
]);
?>