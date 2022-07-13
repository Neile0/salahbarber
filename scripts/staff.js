var appointments = []
var displayingDate = null
var selectedRef = null

$(document).on("click","#staff-appointment-table tr", function(){
    var ref=$(this).find('td:first').html();
    var appointment = appointments.find(function(e,index) {
        if (e["ref"] == ref){
            return true;
        }
      });
    appointmentPopUp(appointment)
});

$(document).on("click","#staff-appointment-details-close", function(){
    var e = document.getElementById("staff-appointment-details-container");
    e.style.display = "none";
});


function appointmentPopUp(appointment){
    var e = document.getElementById("staff-appointment-details-container");
    var time = appointment["start_time"];
    var date = appointment["date"];
    var name = appointment["first_name"] + " " + appointment["surname"];
    var contact = appointment["contact_phone"];
    var service = appointment["service_title"];
    var ref = appointment["ref"];
    var priceQuoted = appointment["price_quoted"];
    var bookedBy = appointment["booked_by"];

    selectedRef = ref

    eTime = document.getElementById("staff-appointment-details-apptime");
    eDate = document.getElementById("staff-appointment-details-appdate");
    eName = document.getElementById("staff-appointment-details-appname");
    eContact = document.getElementById("staff-appointment-details-appcontact");
    eRef = document.getElementById("staff-appointment-details-appref");
    eService = document.getElementById("staff-appointment-details-appservicetitle");
    ePriceQuoted = document.getElementById("staff-appointment-details-apppricequoted");
    eBookedBy = document.getElementById("staff-appointment-details-appbookedby");
    
    eTime.innerHTML = convertAMPM(time);
    eDate.innerHTML = convertDate(date);
    eName.innerHTML = name;
    eContact.innerHTML = contact
    eRef.innerHTML = "Booking No. " + ref;
    eService.innerHTML = service;
    ePriceQuoted.innerHTML = "£"+priceQuoted;
    eBookedBy.innerHTML = "Booked by " + bookedBy;



    e.style.display = "block";
}

function closeAppointmentPopUp(){
    var e = document.getElementById("staff-appointment-details-container");
    e.style.display = "none";
    selectedRef = null

}


function displayAppointments(date){
    displayingDate = date
    appointments = getAppointments(date);
    var table = document.getElementById("staff-appointment-table");
    table.innerHTML = ""
    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    var headerRefCell = headerRow.insertCell(0);
    var headerTimeCell = headerRow.insertCell(1);
    var headerNameCell = headerRow.insertCell(2);
    var headerServiceCell = headerRow.insertCell(3);
    headerRefCell.innerHTML = "Ref";
    headerTimeCell.innerHTML = "Time";
    headerNameCell.innerHTML = "Name";
    headerServiceCell.innerHTML = "Service";
    headerRefCell.className = "staff-appointment-ref";
    headerTimeCell.className = "staff-appointment-header";
    headerNameCell.className = "staff-appointment-header";
    headerServiceCell.className = "staff-appointment-header";

    if (appointments.length != 0) {
    for (i = 1; i<appointments.length+1;i++){
        var row = table.insertRow(i);
        var time = convertAMPM(appointments[i-1]["start_time"]);
        var name = appointments[i-1]["first_name"] + " " + appointments[i-1]["surname"];
    
        var refCell = row.insertCell(0);
        var timeCell = row.insertCell(1);
        var nameCell = row.insertCell(2);
        var serviceCell = row.insertCell(3);
        refCell.className = "staff-appointment-ref";
        refCell.innerHTML = appointments[i-1]["ref"];
        timeCell.innerHTML = time;
        nameCell.innerHTML = name;
        serviceCell.innerHTML = appointments[i-1]["service_title"];

    }

    }
    else {
        var row = table.insertRow(1);
        var cell = row.insertCell(0);
        cell.innerHTML = "You have no appointments on this date";
    }
}


function getAppointments(date){
    var ls = [];
    function getFunction(xhttp){
        var response = JSON.parse(xhttp.responseText);
        ls = response;
    }
    getRequest("/scripts/get_appointments.php?date="+date,getFunction);
    return ls;
}




function printAppointments(){
    var date = document.getElementById("staff-appointment-date").value;
    var table = document.getElementById("staff-appointment-table-cont").outerHTML;
   
    var win = window.open("","","height=700,width=700");
    win.document.write(date + table);
    win.document.close();
    win.print();
    
}

function cancelAppointmentPopUp(){
    var e = document.getElementById("staff-appointment-cancel-container");
    e.style.display = "block";
}

function closeCancelAppointmentPopUp(){
    var e = document.getElementById("staff-appointment-cancel-container");
    e.style.display = "none";
}

function cancelAppointmentConfirm(){
    setTimeout(function(){cancelAppointment()},500);
}

function cancelAppointment(){
    var reason = $("#staff-appointment-cancel-reason-textarea").val().trim();
    $.ajax({
        url:'/scripts/cancel_appointment.php',
        type:'post',
        data:{ref:selectedRef,reason:reason},
        success:function(response){
            if(response == 1){
                closeCancelAppointmentPopUp();
                closeAppointmentPopUp();
                displayAppointments(displayingDate);
            }else{
                alert("Error: something went wrong")
            }
        }
    });


}


function initializeAppointments(){
    var dateSelector = document.getElementById("staff-appointment-date");
    nextDate = getNextDayOfAppointments();
    
    if (nextDate != 0){
        dateSelector.value = nextDate;
        displayAppointments(nextDate);
    }
    else {
        currentDate = new Date();
        yy = currentDate.getFullYear();
        mm = currentDate.getMonth()+1;
        mm = (mm != 13) ? mm : 1;
        mm = (mm < 10) ? "0"+mm : mm
        dd = currentDate.getDate();
        str = yy + "-" + mm + "-" + dd
       
        dateSelector.value = str;
        displayAppointments(str);
    }
    

}


function getNextDayOfAppointments(){
    var date = "";
    function getFunction(xhttp){
        var response = xhttp.responseText;
        date = response;
    }
    getRequest("/scripts/get_next_day_of_appointments.php",getFunction);
    return date;
}


function convertAMPM(time) {
    var timedata = time.split(":");
    var hours = timedata[0];
    var minutes = timedata[1];
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function convertDate(datestr){
    var date = new Date(datestr);
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = date.getDate();
    var month = MONTHS[date.getMonth()];
    var year = date.getFullYear();
    return day + " " + month + " " + year;
}


function getRequest(url, cFunction) {
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };
    xhttp.open("GET", url, false);
    xhttp.send();
};

