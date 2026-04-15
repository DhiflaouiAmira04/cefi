<?php
require_once "config/database.php";

// Admin info
$nom = "Super Admin";
$email = "admin";
$mot_de_passe = password_hash("admin", PASSWORD_BCRYPT);
$role = "admin";

// Prepare statement
$stmt = $conn->prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nom, $email, $mot_de_passe, $role);

if ($stmt->execute()) {
    echo "Admin créé avec succès ✅";
} else {
    echo "Erreur : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
