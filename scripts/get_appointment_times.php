<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$dbPath = $path . "/scripts/conn.php";
require_once($dbPath);

$id = 1;
$date = $_REQUEST["date"];
$appointmentDuration = 20;
$TIME_INTERVAL_DURATION = 5;

$dayOfWeek = date("D", strtotime($date));

$startEndTimeSQL = "SELECT start_time, end_time FROM staff_schedule WHERE staff_id = 1 and day = '" . $dayOfWeek . "'";
$startEndTimeSQLResults = $db->query($startEndTimeSQL);
$startEnd = $startEndTimeSQLResults->fetch_all();


$startTime = "09:00:00";
$endTime = "18:00:00";


foreach ($startEnd as list($s, $e)) {
    $startTime = $s;
    $endTime = $e;
}



function intervals($intervalstart, $intervalend, $intervalduration)
{
    $interval = new DateInterval("PT" . $intervalduration . "M");
    $intervalstart = new DateTime($intervalstart);
    $intervalend = new DateTime($intervalend);
    $l = [];
    for ($intStart = $intervalstart; $intStart < $intervalend; $intStart->add($interval)) {
        $endPeriod = clone $intStart;
        $endPeriod->add($interval);
        if ($endPeriod > $intervalend) {
            break;
        }
        $l[] = [$intStart->format('H:i'), $endPeriod->format('H:i')];
    }
    return $l;
}

$possibleTimeSlots = intervals($startTime, $endTime, $TIME_INTERVAL_DURATION);

$preBooked = [];

$sql = "SELECT start_time, end_time_expected FROM appointment WHERE date = ? AND staff_id = ? AND cancelled = 0 ORDER BY start_time";
$stmt = $db->prepare($sql);
$stmt->bind_param("si", $date, $id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($bookedstart, $bookedend);
if ($stmt->num_rows > 0) {
    while ($stmt->fetch()) {
        array_push($preBooked, [$bookedstart, $bookedend]);
    }
}
$stmt->close();

$booked = [];

foreach ($preBooked as $e) {
    $eSlots = intervals($e[0], $e[1], $TIME_INTERVAL_DURATION);
    $booked = array_merge($booked, $eSlots);
}

function filterSlots($e)
{
    global $booked;
    if (in_array($e, $booked)) {
        return FALSE;
    } else {
        return TRUE;
    }
}

$appointmentSlots = [];
$timeSlots = array_values(array_filter($possibleTimeSlots, "filterSlots"));
$occupies = $appointmentDuration / $TIME_INTERVAL_DURATION;
for ($i = 0; $i < (count($timeSlots) - $occupies + 1); $i++) {
    $slotStart = new DateTime($timeSlots[$i][0]);
    $dur = new DateInterval("PT" . $appointmentDuration . "M");
    $target = clone $slotStart;
    $target->add($dur);

    if (new DateTime($timeSlots[$i + $occupies - 1][1]) == $target) {
        array_push($appointmentSlots, [$slotStart->format('H:i'), $target->format('H:i')]);
    }
}

function remove_unwanted($e)
{
    $SUB_OF_HOUR = ["00", "20", "40"];
    $mm = substr($e[0], -2);
    if (!in_array($mm, $SUB_OF_HOUR)) {
        return FALSE;
    } else {
        return TRUE;
    }
}

$finalSlots = array_values(array_filter($appointmentSlots, "remove_unwanted"));

echo json_encode($finalSlots);
$db->close();
