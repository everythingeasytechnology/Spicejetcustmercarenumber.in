<?php
header('Content-Type: application/json');
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$category = trim($data['category'] ?? '');
$reference = trim($data['reference'] ?? '');
$message = trim($data['message'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $phone === '' || $category === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields correctly.']);
    exit;
}

$stmt = $conn->prepare('INSERT INTO contact_messages (full_name, email, phone, category, reference_id, message) VALUES (?, ?, ?, ?, ?, ?)');
$stmt->bind_param('ssssss', $name, $email, $phone, $category, $reference, $message);
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Your enquiry has been submitted.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Unable to submit enquiry.']);
}
?>
