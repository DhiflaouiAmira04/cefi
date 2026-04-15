<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once "../config/database.php";

$action = $_GET['action'] ?? 'list';

// --- LISTER LES UTILISATEURS ---
if ($action == 'list') {
    $sql = "SELECT id, nom, email, role, statut  FROM utilisateurs WHERE role = 'etudiant'";
    $result = $conn->query($sql);
    $users = [];
    while($row = $result->fetch_assoc()) { $users[] = $row; }
    echo json_encode($users);
}

// --- DESACTIVER / ACTIVER ---
if ($action == 'toggle_status') {
    $id = $_GET['id'];
    $new_status = $_GET['status']; // 'actif' ou 'inactif'
    $stmt = $conn->prepare("UPDATE utilisateurs SET statut = ? WHERE id = ?");
    $stmt->bind_param("si", $new_status, $id);
    $stmt->execute();
    echo json_encode(["success" => true]);
}

// --- SUPPRIMER ---
if ($action == 'delete') {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM utilisateurs WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(["success" => true]);
}
?>