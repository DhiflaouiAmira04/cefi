<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

// Puisque tu envoies un FormData en Angular, on utilise $_POST
if (!empty($_POST['id'])) {
    $id_a_supprimer = $_POST['id'];

    // On utilise ID ou CIN selon ta colonne en base de données
    // D'après ton Angular tu filtres par 'ID', donc on reste sur ID
    $sql = "DELETE FROM enseignant WHERE ID = ?"; 
    $stmt = $conn->prepare($sql);
    
    // "i" signifie integer (entier)
    $stmt->bind_param("i", $id_a_supprimer);

    if($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Enseignant supprimé avec succès"]);
        } else {
            echo json_encode(["message" => "Aucun enseignant trouvé avec cet ID"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erreur de suppression : " . $conn->error]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "ID manquant dans la requête"]);
}
?>