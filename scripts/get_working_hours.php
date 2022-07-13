<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    $dbPath = $path . "/scripts/conn.php";
    require_once($dbPath);

    $id = $_REQUEST["id"];
    $workingHours = [];

    $sql = "SELECT day,start_time,end_time,staff_id,staff.first_name FROM staff_schedule,staff WHERE staff_id = ? AND staff.id = ?";
    
    $stmt = $db->prepare($sql);
    $stmt->bind_param("ii",$id,$id);
    $stmt->execute();

    $result = $stmt->get_result();
    while ($row = $result->fetch_object()) {
        array_push($workingHours,$row);
    };

    echo json_encode($workingHours);
    $db->close();
?>