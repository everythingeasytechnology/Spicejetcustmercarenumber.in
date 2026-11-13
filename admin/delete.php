<?php
session_start();
if (empty($_SESSION['admin_id']) || $_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: index.php'); exit; }
if (!hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'] ?? '')) { http_response_code(403); die('Invalid security token.'); }
require_once '../config.php';
$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$type = $_POST['type'] ?? '';
if (!$id || !in_array($type, ['application', 'message'], true)) { header('Location: dashboard.php'); exit; }
$table = $type === 'application' ? 'applications' : 'contact_messages';
$stmt = $conn->prepare("DELETE FROM {$table} WHERE id = ?");
$stmt->bind_param('i', $id); $stmt->execute();
$anchor = $type === 'application' ? 'applications' : 'enquiries';
header("Location: dashboard.php?deleted=1#{$anchor}");
?>
