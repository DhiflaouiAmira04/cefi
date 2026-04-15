
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "cefi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $nom_diplome = $_GET['nom'] ?? '';

    if (!empty($nom_diplome)) {
        // 1. Njibou el ID mte3 el diplôme b'esmo
        $stmt = $conn->prepare("SELECT id, nom_diplome FROM diplomes WHERE nom_diplome = :nom LIMIT 1");
        $stmt->execute([':nom' => $nom_diplome]);
        $diplome = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($diplome) {
            // 2. Njibou el etudiants mte3 el diplôme hedha (Niveau 1 barka par exemple)
            $stmtEtud = $conn->prepare("SELECT matricule, nom_prenom, cin, telephone FROM inscrit WHERE diplome_id = :id AND niveau = 1 AND statut = 'Accepté'");
            $stmtEtud->execute([':id' => $diplome['id']]);
            $etudiants = $stmtEtud->fetchAll(PDO::FETCH_ASSOC);

            // Nraj3ou el objet kaamel
            echo json_encode([
                "nom_diplome" => $diplome['nom_diplome'],
                "etudiants" => $etudiants
            ]);
        } else {
            echo json_encode(["error" => "Diplôme non trouvé"]);
        }
    }
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>