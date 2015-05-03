<?php
$host = "104.236.43.114";
$user = "root";
$pass = "rootastic2015";
$dbname = "mydatabase";

// connect mySQL
$conn = mysqli_connect($host, $user, $pass, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>