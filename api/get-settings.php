<?php
header('Content-Type: application/json');
require_once '../config.php';
$result = $conn->query('SELECT phone, email, address FROM site_settings WHERE id = 1');
$settings = $result ? $result->fetch_assoc() : null;
echo json_encode(['status' => $settings ? 'success' : 'error', 'data' => $settings]);
?>
