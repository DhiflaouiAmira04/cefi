<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 🔥 FROM inscrit (موش etudiants)
    $query = "
        SELECT 
            d.nom_diplome,
            i.nom_prenom,
            i.matricule,
            i.email,
            i.telephone
        FROM inscrit i
        LEFT JOIN diplomes d ON d.id = i.diplome_id
        WHERE i.niveau = 2
        ORDER BY d.nom_diplome ASC
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $data_grouped = [];

    foreach ($results as $row) {

        $diplome = $row['nom_diplome'] ?? 'Sans diplôme';

        if (!isset($data_grouped[$diplome])) {
            $data_grouped[$diplome] = [
                'nom_diplome' => $diplome,
                'etudiants' => []
            ];
        }

        $data_grouped[$diplome]['etudiants'][] = [
            'nom_prenom' => $row['nom_prenom'],
            'matricule' => $row['matricule'],
            'email' => $row['email'],
            'telephone' => $row['telephone']
        ];
    }

    echo json_encode(array_values($data_grouped));

} catch(PDOException $exception) {
    http_response_code(500);
    echo json_encode([
        "error" => $exception->getMessage()
    ]);
}
?>