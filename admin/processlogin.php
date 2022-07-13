<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$adminPath = $path ."/admin";

$dbPath = $path . "/scripts/conn.php";
$sessionPath = $adminPath . "/session.php";
require($dbPath);
require($sessionPath);

$username = mysqli_real_escape_string($db,$_POST["username"]);
$password = mysqli_real_escape_string($db,$_POST["password"]);

$sql = "SELECT id, username, pwd FROM staff WHERE username = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("s",$username);
$stmt->execute();
$stmt->store_result();

$stmt->bind_result($adminId,$username,$pw);

if($stmt->num_rows == 1){
    $stmt->fetch();
    if (password_verify($password,$pw)){
        $_SESSION["auth"] = TRUE;
        $_SESSION["username"] = $username;
        $_SESSION["adminId"] = $adminId;
        echo 1;
        
        
        exit;
    }
    else {
        $_SESSION = [];
        session_destroy();
        echo 0;
    }
}
else{
    $_SESSION = [];
    session_destroy();
    echo 0;

}



 ?>