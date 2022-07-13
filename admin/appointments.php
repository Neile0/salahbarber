<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salah Michelle | Staff</title>
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="icon" type="image/svg" href="/images/icons/favicon.svg">
    <script src="/scripts/staff.js"></script>
</head>
<?php 
$path = $_SERVER['DOCUMENT_ROOT'];
$staffPath = $path ."/admin";
$dbPath = $path . "/scripts/conn.php";
$sessionPath = $staffPath . "/session.php";
$navPath = $staffPath . "/staffnav.php";
require($sessionPath);
require($dbPath);



$CURRENTDAY = date("Y-m-d");

?>
<body>
<?php
include_once($navPath);

?>
<main class="staff-main bg-secondary staff-dashboard">
<?php


$sql = "SELECT date as 'next' FROM appointment WHERE NOT (date < ?) order by date, start_time ASC LIMIT 1";
$stmt = $db->prepare($sql);
$stmt->bind_param("s", $CURRENTDAY);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows >= "1") {
    while($row = $result->fetch_assoc()){ 
        $NEXTDATE = $row["next"];
    }
}
else{
    echo " You have no upcoming appointments.";

}
$stmt->close();

?>


<h1>My Appointments</h2>
<div class="staff-appointments-block ">
    <div class="staff-appointments-actions">
        <div class="staff-appointments-action-card staff-card">
            <a class="staff-card-a" href="/staff/pages/new_app.php">
        <div class="staff-appointments-action-card-ico">
            <h1>+</h1>
        </div>
        <div class="staff-appointments-action-card-title">
            <h2>Create New</h2>
        </div>
            
        </a>
        </div>

    </div>
    <p>Showing appointments for :</p><input type="date" value="<?php echo $CURRENTDAY;?>" onchange="displayAppointments(this.value)">
    <table class="staff-appointment-table">
        <tr><th class="staff-appointment-header">Time</th><th class="staff-appointment-header">Name</th><th class="staff-appointment-header">Service</th></tr>
        <!-- <tr><td>11am</td><td>Aidan</td><td>Cut & Style</td></tr> -->
            <?php
                   
                    $sql = "SELECT appointment.start_time, client.first_name, service.title FROM appointment, client, service WHERE appointment.client_id = client.id AND appointment.service_id = service.id AND appointment.staff_id = 5 AND appointment.date = '2020-08-11'";
                    $stmt = $db->prepare($sql);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr><td>" . $row['start_time'] . "</td><td>" . $row["first_name"] . "</td><td>".$row["title"] . "</td></tr>";
                    };

                    ?> 

                </table>
</div>
</main>


</body>


</html>