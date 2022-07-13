<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$dbPath = $path . "/scripts/conn.php";
require_once($dbPath);

$type = $_REQUEST["type"];
$services = [];

$sql = "SELECT * FROM service WHERE type = ? AND is_public = 1 ORDER BY type DESC";

$stmt = $db->prepare($sql);
$stmt->bind_param("s", $type);
$stmt->execute();

$result = $stmt->get_result();
while ($row = $result->fetch_object()) {
    array_push($services, $row);
};

echo json_encode($services);
$db->close();
