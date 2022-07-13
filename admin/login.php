<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salah Michelle | Staff Login </title>
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="icon" type="image/svg" href="/images/icons/favicon.svg">
    <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"> 
    </script> 
    <script src="/scripts/login.js"></script>
</head>
<?php 
$path = $_SERVER['DOCUMENT_ROOT'];
$staffPath = $path ."/admin";
$sessionPath = $staffPath . "/session.php";

require($sessionPath);
if (logged_in()){
    header("Location: /admin/index.php");
}


?>
<body>
    <div class="staff-login bg-white">
        <div class="staff-login-block">
            <div class="staff-login-title">
                <h1>Salah Barber</h1>
                <hr>
            </div>
            <div class="staff-login-form">
              
                    <input class="staff-login-input " type="text" name="username" id="staff-login-username" placeholder="Username" autofocus autocomplete="off"> 
                    <input class="staff-login-input" type="password" name="password" id="staff-login-pwd" placeholder="Password" value="">                    
                    <input class="staff-login-input-submit button bg-accent-one-light" name="login" id="staff-login-btn" type="submit" value="Login">
              
                <div id="staff-login-msg"></div>
            </div>      
        </div>
    </div>
</body>
</html>