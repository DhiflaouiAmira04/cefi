<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    
    // Njibou el archives maktoubin b'el annee
    $query = "SELECT a.*, d.nom_diplome 
              FROM archive_promotions a
              LEFT JOIN diplomes d ON a.diplome_id = d.id
              ORDER BY a.annee_scolaire DESC, a.nom_prenom ASC";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Houni el "Secret": Groupement par Année fel PHP
    $archives_grouped = [];
    foreach ($results as $row) {
        $annee = "Promotion " . $row['annee_scolaire'];
        if (!isset($archives_grouped[$annee])) {
            $archives_grouped[$annee] = [
                'annee' => $annee,
                'etudiants' => []
            ];
        }
        $archives_grouped[$annee]['etudiants'][] = $row;
    }

    echo json_encode(array_values($archives_grouped));

} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>