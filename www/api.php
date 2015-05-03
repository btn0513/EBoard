<?php
require 'dbConn.php';



//  INSERT PERSON
$sql = "INSERT INTO". 
    " Person (fname, lname,  Email)".
" VALUES ('reggie', 'roby', 'regg@a.com')";


//  INSERT 
$sql = "INSERT INTO". 
    " Visited (SID, PID)".
" VALUES (2,44)";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

echo "m";

?>

