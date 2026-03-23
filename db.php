<?php
$host = "sql200.hstn.me"; // change this
$dbname = "mseet_41455767_falari_database";  // change this
$username = "mseet_41455767";       // change this
$password = "ACTICFBSCS2AEP";      // change this

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

    // SECURITY SETTINGS
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

} catch (PDOException $e) {
    die("Database connection failed");
}
?>