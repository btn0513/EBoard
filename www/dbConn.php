<?php
$host = "urbancolonization.com";
$user = "root";
$pass = "rootastic2015";
$dbname = "urbancol";

// connect mySQL
$conn = mysqli_connect($host, $user, $pass, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>