<?php
require 'dbConn.php';


// LOGIN & SIGNUP
if($_GET["action"]=="signup"){
    $sql = "INSERT INTO User (Email)".
    " VALUES ('".$_GET["user"]."')";
    $result = mysqli_query($conn, $sql);
    $status = 0;
    if($result)
        $status = 1;
    echo "{\"status\":".$status.",\"user\":\"".$_GET["user"]."\"}";
}else if($_GET["action"]=="login"){
    $sql = "SELECT * FROM User WHERE Email=\"".$_GET["user"]."\"";
    $result = mysqli_query($conn, $sql);
    $status = 0;
    if(mysqli_num_rows($result) == 1)
        $status = 1;
    echo "{\"status\":".$status.",\"user\":\"".$_GET["user"]."\"}";
}

// GET DISCOVERED COLONIES
else if($_GET["action"]=="colonies"){
    $sql = "SELECT * FROM User JOIN User_Visited_Colony on User.UID = User_Visited_Colony.UID ".
            "WHERE Email=\"".$_GET["user"]."\"";
    $result = mysqli_query($conn, $sql);
    $status = 1;
    $colonies = array();
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)) {
            $colonies[] = $row["CID"];
        }
    }
    echo "{\"status\":".$status.",\"user\":\"".$_GET["user"].
            "\",\"discovered\":[".implode(", ",$colonies)."]}";
}

// DISCOVER COLONIES
else if($_GET["action"]=="discover"){
    $sql = "SELECT * FROM Colony WHERE QR=\"".$_GET["code"]."\"";
    $result = mysqli_query($conn, $sql);
    $status = 0;
    
    if(mysqli_num_rows($result) == 1){
        $colony = mysqli_fetch_assoc($result);
        
        $sql = "SELECT * FROM User WHERE Email=\"".$_GET["user"]."\"";
        $result = mysqli_query($conn, $sql);
        $user = mysqli_fetch_assoc($result);
        
        $sql = "INSERT INTO User_Visited_Colony (UID, CID) ".
                "VALUES (".$user["UID"].",".$colony["CID"].")";
        $result = mysqli_query($conn, $sql);
        
        if($result)
            $status = 1;
    }
    echo "{\"status\":".$status.",\"user\":\"".$_GET["user"]."\"}";
}

/*
//  add visited colony
$sql = "INSERT INTO  Visited (SID, PID)".
    " VALUES (2,44)";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
*/
mysqli_close($conn);

?>

