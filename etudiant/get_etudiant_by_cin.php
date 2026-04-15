<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

// Récupération du CIN depuis GET
$cin = isset($_GET['cin']) ? $conn->real_escape_string($_GET['cin']) : '';

if(empty($cin)){
    echo json_encode(["error" => "CIN manquant"]);
    exit;
}

// On récupère l'étudiant complet avec info utilisateur
$query = "SELECT 
            u.id AS user_id,
            u.statut AS compte_statut,
            e.*
          FROM inscrit e
          LEFT JOIN utilisateurs u ON u.email = e.email
          WHERE e.cin = '$cin'
          LIMIT 1";

$result = $conn->query($query);

if($result && $row = $result->fetch_assoc()){
    echo json_encode($row);
} else {
    echo json_encode(["error" => "Étudiant non trouvé"]);
}
?>