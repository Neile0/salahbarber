<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$dbPath = $path . "/scripts/conn.php";
require($dbPath);

$ref = $_POST["ref"];
$reason = $_POST["reason"];


$sql = "UPDATE appointment SET cancelled = 1, cancelled_reason = ? WHERE (ref = ?)";
$stmt = $db->prepare($sql);
$stmt->bind_param("si",$reason,$ref);
$stmt->execute();
echo 1;
 ?>