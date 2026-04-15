<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    
    // Njibou el ma3loumet mel table archive_promotions
    // Nzidou JOIN m3a diplomes bech n'affichiw el esm mouch l'id
    $query = "SELECT a.*, d.nom_diplome 
              FROM archive_promotions a
              LEFT JOIN diplomes d ON a.diplome_id = d.id
              ORDER BY a.annee_scolaire DESC, a.nom_prenom ASC";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Groupement automatique par Année
    $grouped = [];
    foreach ($results as $row) {
        $year = $row['annee_scolaire'];
        if (!isset($grouped[$year])) {
            $grouped[$year] = [
                'promotion' => $year,
                'etudiants' => []
            ];
        }
        $grouped[$year]['etudiants'][] = $row;
    }

    echo json_encode(array_values($grouped));

} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>