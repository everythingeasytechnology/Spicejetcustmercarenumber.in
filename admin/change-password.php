<?php
session_start();
if (empty($_SESSION['admin_id']) || $_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: index.php'); exit; }
if (!hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'] ?? '')) { http_response_code(403); die('Invalid security token.'); }
require_once '../config.php';

$current = $_POST['current_password'] ?? '';
$new = $_POST['new_password'] ?? '';
$confirm = $_POST['confirm_password'] ?? '';
$stmt = $conn->prepare('SELECT password FROM admins WHERE id = ? LIMIT 1');
$stmt->bind_param('i', $_SESSION['admin_id']);
$stmt->execute();
$admin = $stmt->get_result()->fetch_assoc();

if (!$admin || !password_verify($current, $admin['password'])) {
    $_SESSION['password_error'] = 'Current password is incorrect.';
} elseif (strlen($new) < 8) {
    $_SESSION['password_error'] = 'New password must contain at least 8 characters.';
} elseif ($new !== $confirm) {
    $_SESSION['password_error'] = 'New password and confirmation do not match.';
} elseif (password_verify($new, $admin['password'])) {
    $_SESSION['password_error'] = 'New password must be different from the current password.';
} else {
    $hash = password_hash($new, PASSWORD_DEFAULT);
    $update = $conn->prepare('UPDATE admins SET password = ? WHERE id = ?');
    $update->bind_param('si', $hash, $_SESSION['admin_id']);
    $update->execute();
    session_regenerate_id(true);
    header('Location: dashboard.php?password_updated=1#security');
    exit;
}
header('Location: dashboard.php#security');
?>
