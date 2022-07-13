<?php
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;

$auth = FALSE;
session_start();
if (logged_in()){
   $auth = TRUE;
}

if (isset($_SESSION['LAST_ACTIVITY']) && ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    log_out();
}
else{
    $_SESSION['LAST_ACTIVITY'] = $time;
}

function logged_in(){
    if (array_key_exists('auth', $_SESSION) && $_SESSION["auth"] == TRUE){
       $auth = TRUE;
       return $_SESSION["auth"]; 
    }
    else{
        return FALSE;
    }
    
}

function confirm_logged_in(){
    if (!logged_in()){
        log_out();
    }
}

function log_out(){
    $_SESSION = [];
    session_destroy();
    header("Location: /staff/login.php");
}



?>