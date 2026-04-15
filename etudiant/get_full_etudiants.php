<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
require_once "../config/database.php";

// On sélectionne les champs importants des deux tables
// On joint par l'email car c'est la clé commune
$query = "SELECT 
            u.id as user_id, 
            u.statut as compte_statut, 
            e.* FROM utilisateurs u
          INNER JOIN etudiants e ON u.email = e.email
          WHERE u.role = 'etudiant'
          ORDER BY e.date_preinscription DESC";

$result = $conn->query($query);

$etudiants = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $etudiants[] = $row;
    }
}

echo json_encode($etudiants);
?>