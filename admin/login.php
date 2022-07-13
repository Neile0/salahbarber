<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salah Michelle | admin Login </title>
    <link rel="stylesheet" href="/styles/admin.css">
    <link rel="icon" type="image/svg" href="/images/icons/favicon.svg">
    <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"> 
    </script> 
    <script src="/scripts/login.js"></script>
</head>
<?php 
$path = $_SERVER['DOCUMENT_ROOT'];
$adminPath = $path ."/admin";
$sessionPath = $adminPath . "/session.php";

require($sessionPath);
if (logged_in()){
    header("Location: /admin/index.php");
}


?>
<body>
    <div class="admin-login bg-white">
        <div class="admin-login-block">
            <div class="admin-login-title">
                <h1>Salah Barber</h1>
                <hr>
            </div>
            <div class="admin-login-form">
              
                    <input class="admin-login-input " type="text" name="username" id="admin-login-username" placeholder="Username" autofocus autocomplete="off"> 
                    <input class="admin-login-input" type="password" name="password" id="admin-login-pwd" placeholder="Password" value="">                    
                    <input class="admin-login-input-submit button bg-accent-one-light" name="login" id="admin-login-btn" type="submit" value="Login">
              
                <div id="admin-login-msg"></div>
            </div>      
        </div>
    </div>
</body>
</html>