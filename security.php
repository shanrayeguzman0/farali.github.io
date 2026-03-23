<?php
// Secure session
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
session_start();

// Security headers
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Access denied");
}

// Input cleaner
function clean_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// CSRF TOKEN
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if (!isset($_POST['csrf_token']) || 
    !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    die("CSRF attack blocked");
}

// Basic SQL injection pattern blocking
$bad_patterns = ['SELECT', 'UNION', 'DROP', '--', '#'];

foreach ($_POST as $input) {
    foreach ($bad_patterns as $pattern) {
        if (stripos($input, $pattern) !== false) {
            die("Malicious input detected");
        }
    }
}

// Rate limiting
if (!isset($_SESSION['attempts'])) {
    $_SESSION['attempts'] = 0;
}

$_SESSION['attempts']++;

if ($_SESSION['attempts'] > 100) {
    die("Too many requests");
}
?>