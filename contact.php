<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$submitted_at = date('Y-m-d H:i:s');

$conn = mysqli_connect('localhost', 'root', '', 'Folio');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO portfolio (name, email, message, submitted_at)
        VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $message, $submitted_at);

if (mysqli_stmt_execute($stmt)) {
    echo "<script>alert('Inquiry submitted successfully. Thank you, $name!'); window.location.href='contact.html';</script>";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
