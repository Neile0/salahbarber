<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salah Barber EK | Admin</title>
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="icon" type="image/svg" href="/images/icons/favicon.svg">
    <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"> 
    </script> 
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
if (!logged_in()){
    log_out();
}
?>

<body>

<?php
include_once($navPath);
?>

<main class="staff-main bg-secondary staff-dashboard">

<div class="staff-dashboard-top">

        <div class="staff-dash-card staff-card">
            <a class="staff-card-a" href="/staff/pages/new_app.php">
        <div class="staff-card-ico staff-dash-card-ico">
            <h1>?</h1>
        </div>
        <div class="staff-card-title staff-dash-card-title">
            <h2>Today</h2>
        </div>
            
        </a>
        </div>
        <div class="staff-dash-card staff-card">
            <a class="staff-card-a" href="/staff/pages/new_app.php">
        <div class="staff-card-ico staff-dash-card-ico">
            <h1>?</h1>
        </div>
        <div class="staff-card-title staff-dash-card-title">
            <h2>This Week</h2>
        </div>
            
        </a>
        </div>
            
        </a>
        </div>

</div>


<div class="staff-appointments-block staff-dash-appointments-block">
    <div class="staff-appointments-subtitle staff-dash-appointments-subtitle">
    <p class="staff-appointments-subtitle staff-dash-appointments-subtitle">Showing appointments for :</p>
    <input type="date" id="staff-appointment-date" value="" style="display:inline" onchange="displayAppointments(this.value)">
    <button class="button bg-accent-two button-no-animation" onclick="printAppointments()">Print</button>
    </div>
     <div class="staff-appointment-table-cont staff-dash-appointment-table-cont" id="staff-appointment-table-cont"> 
    <table class="staff-appointment-table staff-dash-appointment-table" id="staff-appointment-table">        
    </table>        
    </div>
    <div class="staff-appointment-details-container" id="staff-appointment-details-container">
        <div class="staff-appointment-details-block">
            <span class="staff-appointment-details-close" id="staff-appointment-details-close">&times;</span>
            <div class="staff-appointment-details" id="staff-appointment-details">
                <div class="staff-appointment-details-time">
                    <p class="staff-appointment-details-apptime" id="staff-appointment-details-apptime"></p>
                    <p class="staff-appointment-details-appdate" id="staff-appointment-details-appdate"></p>
                    <hr>
                </div>
                <div class="staff-appointment-details-app">
                    <p class="staff-appointment-details-appname" id="staff-appointment-details-appname"></p>
                    <p class="staff-appointment-details-appcontact" id="staff-appointment-details-appcontact"></p>
                    <br>
                    <p class="staff-appointment-details-appref" id="staff-appointment-details-appref"></p>
                    <p class="staff-appointment-details-appservicetitle" id="staff-appointment-details-appservicetitle"></p>
                    <p class="staff-appointment-details-apppricequoted" id="staff-appointment-details-apppricequoted"></p>
                    <p class="staff-appointment-details-appbookedby" id="staff-appointment-details-appbookedby"></p>
                </div>
                <div class="staff-appointment-details-buttons">
                    <button class="button button-no-animation bg-accent-one-light staff-appointment-details-btndone" onclick="closeAppointmentPopUp()">Done</button>
                    <button class="button button-no-animation bg-white staff-appointment-details-btncancel" onclick="cancelAppointmentPopUp()">Cancel Appointment</p>
                </div>
                
            </div>
        </div>
    </div>
    <div class="staff-appointment-cancel-container" id="staff-appointment-cancel-container">
        <div class="staff-appointment-cancel-block">
            <div class="staff-appointment-cancel" id="staff-appointment-cancel">
                <div class="staff-appointment-cancel-header">
                    <p class="staff-appointment-cancel-title">Cancel Appointment</p>
                    <p class="staff-appointment-cancel-subtitle">Are you sure you want to cancel this appointment?</p>
                </div>
                <div class="staff-appointment-cancel-reason">
                    <p>Please give a reason:</p>
                    <textarea name="reason" id="staff-appointment-cancel-reason-textarea" cols="num" rows="num" maxlength="144"></textarea>
                </div>
                <div class="staff-appointment-cancel-buttons">
                    <button class="button button-no-animation bg-white staff-appointment-cancel-btnno" onclick="closeCancelAppointmentPopUp()">Back</button>
                    <button class="button button-no-animation staff-appointment-cancel-btncancel" onclick="cancelAppointmentConfirm()">Confirm</button>
                </div>
                
            </div>
        </div>
    </div>


</div>
</main>


</body>
<script>
$(document).ready(function(){
    initializeAppointments();
})
</script>
</html>