<?php
$dbHost = '68.178.236.80';
$dbUser = 'Spicejetcustmercarenumber';
$dbPass = 'oZx5VW&~WY1~avr1';
$dbName = 'Spicejetcustmercarenumber.in';

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    http_response_code(500);
    die('Database connection failed. Check config.php.');
}
$conn->set_charset('utf8mb4');
?>
