<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

include("../config/database.php");

// قراءة JSON
$data = json_decode(file_get_contents("php://input"));

// تحقق
if (!empty($data->id)) {

    $id = mysqli_real_escape_string($conn, $data->id);

    // 🔍 check if exists
    $check = mysqli_query($conn, "SELECT * FROM inscrit WHERE id='$id'");
    if (mysqli_num_rows($check) == 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Étudiant non trouvé dans inscrit"
        ]);
        exit();
    }

    // 🔄 جلب etudiant_id
    $row = mysqli_fetch_assoc($check);
    $etudiant_id = $row['etudiant_id'];

    // ❌ حذف من inscrit
    $delete = mysqli_query($conn, "DELETE FROM inscrit WHERE id='$id'");

    if ($delete) {

        // 🟡 تحديث الحالة (اختياري)
        mysqli_query($conn, "UPDATE etudiants SET statut='En attente' WHERE id='$etudiant_id'");

        echo json_encode([
            "status" => "success",
            "message" => "Étudiant supprimé avec succès"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Erreur lors de la suppression"
        ]);
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => "ID requis"
    ]);
}
?>