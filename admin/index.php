<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salah Barber EK | Admin</title>
    <link rel="stylesheet" href="/admin.css">
    <link rel="icon" type="image/svg" href="/static/hair1.svg">
    <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"> 
    </script> 
    <script src="/scripts/admin.js"></script>
</head>
<?php 
$path = $_SERVER['DOCUMENT_ROOT'];
$adminPath = $path ."/admin";
$dbPath = $path . "/scripts/conn.php";
$sessionPath = $adminPath . "/session.php";
$navPath = $adminPath . "/adminnav.php";
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

<main class="admin-main bg-secondary admin-dashboard">

<div class="admin-dashboard-top">

        <div class="admin-dash-card admin-card">
            <a class="admin-card-a" href="/admin/pages/new_app.php">
        <div class="admin-card-ico admin-dash-card-ico">
            <h1>?</h1>
        </div>
        <div class="admin-card-title admin-dash-card-title">
            <h2>Today</h2>
        </div>
            
        </a>
        </div>
        <div class="admin-dash-card admin-card">
            <a class="admin-card-a" href="/admin/pages/new_app.php">
        <div class="admin-card-ico admin-dash-card-ico">
            <h1>?</h1>
        </div>
        <div class="admin-card-title admin-dash-card-title">
            <h2>This Week</h2>
        </div>
            
        </a>
        </div>
            
        </a>
        </div>

</div>


<div class="admin-appointments-block admin-dash-appointments-block">
    <div class="admin-appointments-subtitle admin-dash-appointments-subtitle">
    <p class="admin-appointments-subtitle admin-dash-appointments-subtitle">Showing appointments for :</p>
    <input type="date" id="admin-appointment-date" value="" style="display:inline" onchange="displayAppointments(this.value)">
    <button class="button bg-accent-two button-no-animation" onclick="printAppointments()">Print</button>
    </div>
     <div class="admin-appointment-table-cont admin-dash-appointment-table-cont" id="admin-appointment-table-cont"> 
    <table class="admin-appointment-table admin-dash-appointment-table" id="admin-appointment-table">        
    </table>        
    </div>
    <div class="admin-appointment-details-container" id="admin-appointment-details-container">
        <div class="admin-appointment-details-block">
            <span class="admin-appointment-details-close" id="admin-appointment-details-close">&times;</span>
            <div class="admin-appointment-details" id="admin-appointment-details">
                <div class="admin-appointment-details-time">
                    <p class="admin-appointment-details-apptime" id="admin-appointment-details-apptime"></p>
                    <p class="admin-appointment-details-appdate" id="admin-appointment-details-appdate"></p>
                    <hr>
                </div>
                <div class="admin-appointment-details-app">
                    <p class="admin-appointment-details-appname" id="admin-appointment-details-appname"></p>
                    <p class="admin-appointment-details-appcontact" id="admin-appointment-details-appcontact"></p>
                    <br>
                    <p class="admin-appointment-details-appref" id="admin-appointment-details-appref"></p>
                    <p class="admin-appointment-details-appservicetitle" id="admin-appointment-details-appservicetitle"></p>
                    <p class="admin-appointment-details-apppricequoted" id="admin-appointment-details-apppricequoted"></p>
                    <p class="admin-appointment-details-appbookedby" id="admin-appointment-details-appbookedby"></p>
                </div>
                <div class="admin-appointment-details-buttons">
                    <button class="button button-no-animation bg-accent-one-light admin-appointment-details-btndone" onclick="closeAppointmentPopUp()">Done</button>
                    <button class="button button-no-animation bg-white admin-appointment-details-btncancel" onclick="cancelAppointmentPopUp()">Cancel Appointment</p>
                </div>
                
            </div>
        </div>
    </div>
    <div class="admin-appointment-cancel-container" id="admin-appointment-cancel-container">
        <div class="admin-appointment-cancel-block">
            <div class="admin-appointment-cancel" id="admin-appointment-cancel">
                <div class="admin-appointment-cancel-header">
                    <p class="admin-appointment-cancel-title">Cancel Appointment</p>
                    <p class="admin-appointment-cancel-subtitle">Are you sure you want to cancel this appointment?</p>
                </div>
                <div class="admin-appointment-cancel-reason">
                    <p>Please give a reason:</p>
                    <textarea name="reason" id="admin-appointment-cancel-reason-textarea" cols="num" rows="num" maxlength="144"></textarea>
                </div>
                <div class="admin-appointment-cancel-buttons">
                    <button class="button button-no-animation bg-white admin-appointment-cancel-btnno" onclick="closeCancelAppointmentPopUp()">Back</button>
                    <button class="button button-no-animation admin-appointment-cancel-btncancel" onclick="cancelAppointmentConfirm()">Confirm</button>
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