<?php
header('Content-Type: application/json');
require_once '../config.php';
$result = $conn->query('SELECT phone AS contact_phone, email AS contact_email, address AS contact_address FROM site_settings WHERE id = 1');
$settings = $result ? $result->fetch_assoc() : null;
echo json_encode(['status' => $settings ? 'success' : 'error', 'data' => $settings]);
?>
