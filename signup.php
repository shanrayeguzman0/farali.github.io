<?php
require 'db.php';
require 'security.php';

$username = clean_input($_POST['username']);
$password = $_POST['password'];
$confirm = $_POST['confirm_password'];

// Validation
if (empty($username) || empty($password)) {
    die("All fields required");
}

if ($password !== $confirm) {
    die("Passwords do not match");
}

if (strlen($password) < 8) {
    die("Password must be at least 8 characters");
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->execute([$username, $hashedPassword]);

    echo "Signup successful! <a href='Loginform.html'>Login</a>";

} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo "Username already exists";
    } else {
        echo "Error occurred";
    }
}
?>