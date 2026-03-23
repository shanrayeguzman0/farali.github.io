<?php
require 'db.php';
require 'security.php';

$username = clean_input($_POST['username']);
$password = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {

    session_regenerate_id(true);

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    // Reset attempts on success
    $_SESSION['attempts'] = 0;

    echo "Login successful!";

} else {
    echo "Invalid username or password";
}
?>