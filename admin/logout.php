<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$staffPath = $path ."/admin";


$sessionPath = $staffPath . "/session.php";
require($sessionPath);
log_out();

?>