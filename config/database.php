<?php

$host = "localhost";
$dbname = "cefi";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Optional: Set charset
$conn->set_charset("utf8");

?>
