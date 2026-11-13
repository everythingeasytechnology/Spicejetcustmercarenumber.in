<?php
session_start();
if (empty($_SESSION['admin_id']) || $_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: index.php'); exit; }
require_once '../config.php';
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$address = trim($_POST['address'] ?? '');
$errors = [];
if ($phone === '') $errors[] = 'Phone number is required.';
elseif (!preg_match('/^[0-9+()\-\s]{7,30}$/', $phone)) $errors[] = 'Please enter a valid phone number.';
if ($email === '') $errors[] = 'Email address is required.';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address, for example support@example.com.';
if ($address === '') $errors[] = 'Registered address is required.';

if ($errors) {
    $_SESSION['settings_errors'] = $errors;
    $_SESSION['settings_old'] = ['phone' => $phone, 'email' => $email, 'address' => $address];
    header('Location: dashboard.php#settings');
    exit;
}
$stmt = $conn->prepare('UPDATE site_settings SET phone = ?, email = ?, address = ? WHERE id = 1');
$stmt->bind_param('sss', $phone, $email, $address);
if (!$stmt->execute()) {
    $_SESSION['settings_errors'] = ['Settings could not be saved. Please try again.'];
    $_SESSION['settings_old'] = ['phone' => $phone, 'email' => $email, 'address' => $address];
    header('Location: dashboard.php#settings');
    exit;
}
header('Location: dashboard.php?saved=1');
?>
