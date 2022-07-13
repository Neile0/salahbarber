<?php
$servername = "localhost:3306";
$username = "root";
$password = "";
$schema = "salahbarber";

// Create connection
$db = new mysqli($servername, $username, $password, $schema);

// Check connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
