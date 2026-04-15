<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Connexion à la base de données
$host = "localhost";
$db_name = "cefi"; // Remplace par le nom de ta base
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => "Connexion échouée : " . $e->getMessage()]);
    exit();
}

// Vérifier si le CIN est fourni dans l'URL
if (isset($_GET['cin']) && !empty($_GET['cin'])) {
    $cin = $_GET['cin'];

    // Préparation de la requête
    $query = "SELECT * FROM etudiants WHERE cin = :cin LIMIT 1";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':cin', $cin);
    $stmt->execute();

    $etudiant = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($etudiant) {
        // Succès : on renvoie l'objet étudiant
        echo json_encode($etudiant);
    } else {
        // Erreur : aucun étudiant trouvé
        http_response_code(404);
        echo json_encode(["message" => "Étudiant non trouvé."]);
    }
} else {
    // Erreur : CIN manquant
    http_response_code(400);
    echo json_encode(["message" => "Le paramètre CIN est requis."]);
}
?>