<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$adminPath = $path ."/admin";


$sessionPath = $adminPath . "/session.php";
require($sessionPath);
log_out();

?>