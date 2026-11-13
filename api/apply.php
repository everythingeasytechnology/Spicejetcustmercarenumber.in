<?php
header('Content-Type: application/json');
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);
$name = trim($data['userName'] ?? '');
$contact = trim($data['contact'] ?? '');
$dob = trim($data['dob'] ?? '');
$job = trim($data['jobAppliedFor'] ?? '');
$location = trim($data['location'] ?? '');
$email = trim($data['email'] ?? '');

if ($name === '' || $contact === '' || $dob === '' || $job === '' || $location === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please fill all fields correctly.']);
    exit;
}

$stmt = $conn->prepare('INSERT INTO applications (user_name, contact, dob, job_role, location, email) VALUES (?, ?, ?, ?, ?, ?)');
$stmt->bind_param('ssssss', $name, $contact, $dob, $job, $location, $email);
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Application submitted successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Unable to submit application.']);
}
?>
