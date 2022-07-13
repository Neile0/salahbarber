var CURRENTDATE = new Date();
var CURRENTDAY = CURRENTDATE.getDate();
var CURRENTMONTH = CURRENTDATE.getMonth();
var CURRENTYEAR = CURRENTDATE.getFullYear();
var CUTOFFDAYS = 1;
var CUTOFF = new Date(CURRENTYEAR,CURRENTMONTH,CURRENTDAY+CUTOFFDAYS);
var DAYSOFWEEK = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
var DAYSOFWEEKLONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var bookingStage = 1;

var selectedMonth = CURRENTMONTH;
var selectedYear = CURRENTYEAR;

var selectedServiceType = "GENTS";
var selectedServiceId = null;
var selectedDuration = null;
var selectedStylistId = null;
var selectedDate = null;
var selectedStart = null;
var selectedEnd = null;

function Service(id=null,title=null,duration=null,price=null,type=null){
    this.id = id,
    this.title = title,
    this.duration = duration,
    this.price = price,
    this.type = type
}

function Stylist(id=null,firstName=null){
    this.id = id,
    this.firstName = firstName
}


function Appointment(){
    this.date = null,
    this.clientId = null,
    this.serviceId = null,
    this.staffId = null,
    this.startTime = null,
    this.endTime = null,
    this.price = null
}

function WorkingHour(day,start,end,staffId,staffName){
    this.day = day,
    this.start = start,
    this.end = end,
    this.staffId = staffId,
    this.staffName = staffName
}

var services = new Array();
var posStylists = new Array();

var stylists = new Array();
var workingHours = new Array();

var timeSlots = new Array();

var selectedService = new Service();
var selectedStylist = new Stylist("ANY");
var appointment = new Appointment();

// initialise
window.onload = function(){
    if ((new Date(CURRENTYEAR,CURRENTMONTH,CURRENTDAY+2).getMonth()) != CURRENTMONTH){
        showCalendar(CURRENTMONTH+1,CURRENTYEAR);
    }
    else {
        showCalendar(CURRENTMONTH,CURRENTYEAR);
    }
    selectServiceType("GENTS");
    
}


// var testTy = getServicesByType("GENTS");
// console.log(testTy);

// var testStyP = getStylistProvides(5);
// console.log(testStyP)

// var testWH = getWorkingHours(5);
// console.log(testWH)

// var testStyD = getStylistByDate(5,"WED");
// console.log(testStyD)

// var testApp = getAppointmentTimes(5,"2020-07-21","09:00","18:00",20);
// console.log(testApp)



//Selection made

function selectServiceType(selected){
    typeChange();
    selectedService.type = selected
    services = getServicesByType(selectedService.type);
    var e = document.getElementById("service-select");
    e.innerHTML = "<option value='NOSELECTION'>Select a Service</option>";
    services.forEach(function(elt){
        let node = document.createElement("option");
        let textnode = document.createTextNode(elt.title + " (£" + elt.price + ")");
        node.appendChild(textnode);
        node.setAttribute("value",elt.id);
        e.appendChild(node);
    });
};

function selectService(selected){
    serviceChange();
    if (selected != "NOSELECTION"){
        selectedService = services.filter(elt => elt.id == selected)[0];
        posStylists = getStylistProvides(selected);
        var e = document.getElementById("stylist-select");
        e.innerHTML = "<option value='ANY'>Any Stylist</option>" ;
        posStylists.forEach(function(elt){
            let node = document.createElement("option");
            let textnode = document.createTextNode(elt.firstName);
            node.appendChild(textnode);
            node.setAttribute("value",elt.id);
            e.appendChild(node);
        });
        activateCalendar();
        selectedStylistId = "ANY";
        selectStylist(selectedStylistId);
    }
}


function selectStylist(selected){
    stylistChange();
    selectedStylistId = selected;
    if (selectedStylistId == "ANY"){
        stylists = posStylists
        stylists.forEach(function(elt){
           workingHours.push(getWorkingHours(elt.id));
        });
    }
    else{
        stylists = posStylists.filter(elt => elt.id == selectedStylistId)[0]
        selectedStylist = stylists
        workingHours = getWorkingHours(selectedStylistId);
    }
    populateCalendarSelectable();
}

function selectDate(selected){
    
    clearDate();
    selectedDate = selected;
    var d = new Date(selectedDate);
    var day = DAYSOFWEEKLONG[d.getDay()];
    var mon = MONTHS[d.getMonth()];
    var dNo = d.getDate();
    var yr = d.getFullYear();

    var e = document.getElementById(selectedDate);
    e.classList.add("selected-date");
    let dayOfWeeki = (new Date(selected).getDay()) -1;
    // fix sundays bodge 14/12/2020
    if (dayOfWeeki == -1){
        dayOfWeeki = 6;
    }
    let dayOfWeek = DAYSOFWEEK[dayOfWeeki]; 
    if (selectedStylistId == "ANY"){
        stylists = getStylistByDate(selectedService.id,dayOfWeek);
        workingHours = [];
        stylists.forEach(function(elt){
            workingHours.push(getWorkingHours(elt.id));
         });
    }
    clearAppointments(); 
    
    if (stylists.length > 0){
        for (var i = 0; i < stylists.length; i ++){
            let stylist = stylists[i]
            let workingOnDay = workingHours[i].filter(elt => elt.day == dayOfWeek)[0]
            let start = workingOnDay.start;
            let end = workingOnDay.end;
            timeSlots.push(getAppointmentTimes(stylist.id,selectedDate,start,end,selectedService.duration));           
        }    
    }
    else {
        let workingOnDay = workingHours.filter(elt => elt.day == dayOfWeek)[0];
        if (workingOnDay != undefined){
            let start = workingOnDay.start;
            let end = workingOnDay.end;
            timeSlots = getAppointmentTimes(stylists.id,selectedDate,start,end,selectedService.duration) ;
        }
    }

    var eTimes = document.getElementById("time-cont");
    eTimes.innerHTML = "";
    // var eTimesNone = document.getElementById("book-times-none");
    // eTimesNone.style.display = "none";
    if (stylists.length > 0){
        for (var i = 0; i < stylists.length; i ++){
            var stylistName = stylists[i].firstName;
            var stylistId = stylists[i].id;
            var node = document.createElement("div");
            node.classList.add("time-item")
            var header = document.createElement("h3")
            var headerText = document.createTextNode("Appointments with " + stylistName + " on " + day + " " + dNo + " " + mon + " " + yr);
            header.appendChild(headerText);
            var select = document.createElement("select")
            var optDefNode = document.createElement("option");
            var optDefText = document.createTextNode("Select a Time");
            optDefNode.setAttribute("value","NOSELECTION");
            optDefNode.appendChild(optDefText);
            select.appendChild(optDefNode);
            select.setAttribute("onchange","selectTime(this.value)");
            timeSlots[i].forEach(function(elt){                
                var start = elt[0];
                var startAMPM = convertAMPM(start);
                var end = elt[1]
                
                var optNode = document.createElement("option");
                var optText = document.createTextNode(startAMPM);

                optNode.setAttribute("value",stylistId+"-"+start+"-"+end);
                optNode.appendChild(optText);
                select.appendChild(optNode);
        
            })
           
            node.appendChild(header);
            node.appendChild(select);
            eTimes.appendChild(node);
        }   
    }
    else {
        var node = document.createElement("div");
        node.classList.add("time-item")
        var header = document.createElement("h3")
        var headerText = document.createTextNode("Appointments with " + selectedStylist.firstName + " on " + selectedDate);
        header.appendChild(headerText);
        var select = document.createElement("select");
        var optDefNode = document.createElement("option");
        var optDefText = document.createTextNode("Select a Time");
        optDefNode.setAttribute("value","NOSELECTION");
        optDefNode.appendChild(optDefText);
        select.appendChild(optDefNode);
        select.setAttribute("onchange","selectTime(this.value)");
        
        timeSlots.forEach(function(elt){                
            var start = elt[0];
            var startAMPM = convertAMPM(start);
            var end = elt[1]
            
            var optNode = document.createElement("option");
            var optText = document.createTextNode(startAMPM);

            optNode.setAttribute("value",start+"-"+end);
            optNode.appendChild(optText);
            select.appendChild(optNode);
    
        })
       
        node.appendChild(header);
        node.appendChild(select);
        eTimes.appendChild(node);
        
    }
}

function selectTime(selected){
    
    if (stylists.length > 0){
        var data = selected.split("-");
        var stylist = data[0];
        selectedStart = data[1];
        selectedEnd = data[2];
        selectedStylist = stylists.filter(elt => elt.id == stylist)[0];
        
    }
    else{
        var data = selected.split("-");
        selectedStart = data[0];
        selectedEnd = data[1];
    }
 
   
 
}

function confirmAppointmentDetails(){
    var d = new Date(selectedDate);
    var day = DAYSOFWEEKLONG[d.getDay()];
    var mon = MONTHS[d.getMonth()];
    var dNo = d.getDate();
    var yr = d.getFullYear();



   
    var details = `Appointment booking for  ${selectedService.type.toUpperCase() + "  " + selectedService.title.toUpperCase()}  with  ${selectedStylist.firstName.toUpperCase()}  on  ${day} ${dNo} ${mon} ${yr} at ${convertAMPM(selectedStart)}` 

    var eAppBlock = document.getElementById("appointment-block");
    var eAppDetails = document.getElementById("appointment-details");
    eAppBlock.style.display = "block";

    var detailsP = document.createElement("p");
    var detailsText = document.createTextNode(details);

    eAppDetails.innerHTML = "";
    detailsP.appendChild(detailsText);
    eAppDetails.appendChild(detailsP);

}


function postAppointmentDetails(){
    var eDate = document.getElementById("form-date")
    var eServiceId = document.getElementById("form-serviceid")
    var eStaffId = document.getElementById("form-staffid")
    var eStart = document.getElementById("form-start")
    var eEnd = document.getElementById("form-end")
    var ePrice = document.getElementById("form-price")
 
    eDate.setAttribute("value",selectedDate)
    eServiceId.setAttribute("value",selectedService.id)
    eStaffId.setAttribute("value",selectedStylist.id)
    eStart.setAttribute("value",selectedStart)
    eEnd.setAttribute("value",selectedEnd)
    ePrice.setAttribute("value",selectedService.price)
}

// Calendar functions

function showCalendar(MONTH,YEAR){
    const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const iMONTH = MONTH;
    const MONTHFROMONE = MONTH + 1

    var eCalMonth = document.getElementById("cal-header-month");
    var eCalBody = document.getElementById("cal-body");

    eCalMonth.innerHTML = MONTHS[iMONTH] + " " + YEAR;
    eCalBody.innerHTML = "";

    const DAYSINMONTH = new Date(YEAR,iMONTH+1,0).getDate();
    const FIRSTDAYWEEKDAY = new Date(YEAR,iMONTH,1).getDay();
    const LASTDAYWEEKDAY = new Date(YEAR,iMONTH+1,0).getDay();         
    let offsetFromMon = FIRSTDAYWEEKDAY - 1;
    let extraDays = 0;

    let iMonthPrior = iMONTH -1;
    let iMonthNext = iMONTH + 1;
    const YEARNEXT = YEAR + 1;
    const YEARPRIOR = YEAR - 1;
    
    if (offsetFromMon == -1) {
        offsetFromMon = 6; 
    };
    if (LASTDAYWEEKDAY > 0){
        extraDays = 6 - (LASTDAYWEEKDAY - 1)
    };
    if (iMonthPrior == -1) {
        iMonthPrior = 11;
    };
    if (iMonthNext == 12){
        iMonthNext = 0;
    };

    let strMonth = (iMONTH + 1).toString();
    let strMonthPrior = (iMonthPrior + 1).toString(); 
    let strMonthNext = (iMonthNext + 1).toString();

    if (parseInt(strMonth) < 10){
        strMonth = "0" + strMonth;
        }
    if (parseInt(strMonthPrior) < 10){
        strMonthPrior = "0"+strMonthPrior;
        }
    if (parseInt(strMonthNext) < 10){
        strMonthNext = "0"+ strMonthNext;
        }

    var days = [];
    if (iMonthPrior == 11){
        for (var i = offsetFromMon-1; i >= 0; i--){
            days.push([YEARPRIOR.toString(),strMonthPrior,(new Date(YEAR,iMONTH,-i).getDate()).toString()]);
        };
        for (var i = 1; i <= DAYSINMONTH;i++){
            if (i < 10) {
                days.push([YEAR.toString(),strMonth,"0"+i.toString()]);
            }
            else{
                days.push([YEAR.toString(),strMonth,i.toString()]);
            }
        };
        if (extraDays > 0){
            for (var i = 1; i <= extraDays;i++){
                days.push([YEAR.toString(),strMonthNext,"0"+i.toString()]);
            };
        };
    }
    else if (iMonthNext == 0){
        for (var i = offsetFromMon-1; i >= 0; i--){
            days.push([YEAR.toString(),strMonthPrior,(new Date(YEAR,iMONTH,-i).getDate()).toString()]);
            console.log([YEAR.toString(),strMonthPrior,(new Date(YEAR,iMONTH,-i).getDate()).toString()]);
        };
        for (var i = 1; i <= DAYSINMONTH;i++){
            if (i < 10) {
                days.push([YEAR.toString(),strMonth,"0"+i.toString()]);
            }
            else{
                days.push([YEAR.toString(),strMonth,i.toString()]);
            }
        };
        if (extraDays > 0){
            for (var i = 1; i <= extraDays;i++){
                days.push([YEARNEXT.toString(),strMonthNext,"0"+i]);
            };
        };
    }
    else {
        for (var i = offsetFromMon-1; i >= 0; i--){
            days.push([YEAR.toString(),strMonthPrior,(new Date(YEAR,iMONTH,-i).getDate()).toString()])
        };
        for (var i = 1; i <= DAYSINMONTH;i++){
            if (i < 10) {
                days.push([YEAR.toString(),strMonth,"0"+i.toString()]);
            }
            else{
                days.push([YEAR.toString(),strMonth,i.toString()]);
            }
        };
        if (extraDays > 0){
            for (var i = 1; i <= extraDays;i++){
                days.push([YEAR.toString(),strMonthNext,"0"+i]);
            }
        };
    }

  
    days.forEach(function([yy,mm,dd]){
        let strFulldate = yy + "-" + mm + "-" + dd;
        let fulldate = new Date(strFulldate);
        let node = document.createElement("div");
        let nodepara = document.createElement("p")
        let textnode = document.createTextNode(dd);
        nodepara.appendChild(textnode);
        node.appendChild(nodepara);
        node.classList.add("cal-day");
        if (fulldate < CUTOFF){
            node.classList.add("unavailable");
        }
        if (selectedStylistId == null) {
                node.classList.add("cal-disabled");
            } 

        if (strFulldate == selectedDate){
            node.classList.add("selected-date");
        }
        if (mm != strMonth){
            node.classList.add("non-selected-month")
        }
        node.classList.add("date-non-selectable")
        node.setAttribute("id",strFulldate);
        eCalBody.appendChild(node);
    });           
};

function activateCalendar(){
    var disabled = document.querySelectorAll(".cal-disabled");
    var left = document.getElementById("cal-left-arrow");
    var right = document.getElementById("cal-right-arrow");
    disabled.forEach(function(elt){
        elt.classList.remove("cal-disabled")
    });
    left.addEventListener("click", previousCalendarMonth);
    right.addEventListener("click", nextCalendarMonth);

}

function previousCalendarMonth(){
    if ((selectedMonth > CURRENTMONTH && selectedYear >= CURRENTYEAR) || selectedYear > CURRENTYEAR ){
        if (selectedMonth == 0){
            selectedMonth = 11;
            selectedYear = selectedYear - 1;
            showCalendar(selectedMonth,selectedYear)
            populateCalendarSelectable();
        }
        else{
            selectedMonth = selectedMonth - 1
            showCalendar(selectedMonth,selectedYear)
            populateCalendarSelectable();
        }
    }
}

function nextCalendarMonth(){
    if (selectedMonth == 11){
        selectedMonth = 0;
        selectedYear = selectedYear + 1;
        showCalendar(selectedMonth,selectedYear);
        populateCalendarSelectable(selectedStylistId);
    }
    else{
        selectedMonth = selectedMonth + 1
        showCalendar(selectedMonth,selectedYear);
        populateCalendarSelectable(selectedStylistId);
    }
}

function populateCalendarSelectable(){
    clearCalendarSelectable();
    var rows = (document.getElementsByClassName("cal-day").length)/7;
    if (stylists.length > 0 ){
        workingHours.forEach(function(stylist){
            stylist.forEach(function(elt){
                var dayOfWeeki = DAYSOFWEEK.indexOf(elt.day) + 1;
                var counter = dayOfWeeki
                for (var i = 0; i < rows; i++){
                    var e = document.querySelector(".cal-body .cal-day:nth-child("+counter+")");
                    if (e.classList.contains("unavailable") != 1) {
                        e.classList.remove("date-non-selectable");
                        e.classList.add("date-selectable");
                        e.setAttribute("onclick","selectDate(this.id)");
                    }
                    counter = counter + 7;
                };
            });
        });
    }
    else{
        workingHours.forEach(function(elt){
            var dayOfWeeki = DAYSOFWEEK.indexOf(elt.day) + 1;
            var counter = dayOfWeeki;
            for (var i = 0; i < rows; i++){
                var e = document.querySelector(".cal-body .cal-day:nth-child("+counter+")");
                if (e.classList.contains("unavailable") != 1) {
                    e.classList.remove("date-non-selectable");
                    e.classList.add("date-selectable");
                    e.setAttribute("onclick","selectDate(this.id)");
                };
                counter = counter + 7;
            };
        });
    };
};

function clearCalendarSelectable(){
    var toDisable = document.querySelectorAll(".date-selectable");
    toDisable.forEach(function(e){
        e.classList.remove("date-selectable");
        e.classList.add("date-non-selectable");
        e.removeAttribute("onclick","selectDate(this.id)")
    })
}

// Other Functions
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

// Get functions
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

function getServicesByType(type){
    var ls = [];
    function getFunction(xhttp){
        var response = JSON.parse(xhttp.responseText);
        response.forEach(function(elt){
            let service = new Service(elt.id,elt.title,elt.duration,elt.price,elt.type);
            ls.push(service);
        });
    }
    getRequest("/scripts/get_services_by_type.php?type="+type,getFunction);
    return ls;
}

function getStylistProvides(serviceId){
    var ls = [];
    function getFunction(xhttp){
        var response = JSON.parse(xhttp.responseText);
        response.forEach(function(elt){
            let stylist = new Stylist(elt.id,elt.first_name);
            ls.push(stylist);
        });
    }
    getRequest("/scripts/get_stylist_provides.php?service="+serviceId,getFunction);
    return ls;
}

function getWorkingHours(staffId){
    var ls = [];
    function getFunction(xhttp){
        var response = JSON.parse(xhttp.responseText);
        response.forEach(function(elt){
            let workingHour = new WorkingHour(elt.day,elt.start_time,elt.end_time,elt.staff_id,elt.staff_name);
            ls.push(workingHour);
        });
    }
    getRequest("/scripts/get_working_hours.php?id="+staffId,getFunction);
    return ls;
}

function getStylistByDate(serviceId,day){
    var ls = [];
    function getFunction(xhttp){
        var response = JSON.parse(xhttp.responseText);
        response.forEach(function(elt){
            let stylist = new Stylist(elt.id,elt.first_name);
            ls.push(stylist);
        });
    }
    getRequest("/scripts/get_stylist_by_date.php?id="+serviceId+"&day="+day,getFunction);
    return ls;
}

function getAppointmentTimes(staffId,date,start,end,duration){
    var ls = [];
    function getFunction(xhttp){
        var response = JSON.parse(xhttp.responseText);
        ls = response;
    }
    getRequest("/scripts/get_appointment_times.php?staffId="+staffId+"&date="+date+"&start="+start+"&end="+end+"&duration="+duration,getFunction);
    return ls;
}

// Validation for when a previous property is changed

function typeChange(){
    selectedServiceId = null;
    clearStylists();
    disableCalendar();
    clearAppointments();
    clearDate();
    
}

function serviceChange(){
    selectedService = new Service();
    clearAppointments();
    clearDate();
}

function stylistChange(){
    clearAppointments();
    clearDate();
    // selectedStylist = new Stylist("ANY");
    // clearStylists();

}

function clearDate(){

    timeSlots = new Array();
    var e = document.querySelectorAll(".selected-date");
    if (e.length > 0){
        e.forEach(elt => elt.classList.remove("selected-date"));
    }
}

function clearStylists(){
    stylists = [];
    workingHours = [];
    var e = document.getElementById("stylist-select");
    e.innerHTML = "<option value='ANY'>Any Stylist</option>";
}

function clearAppointments(){
   
    var e = document.getElementById("time-cont")
    e.innerHTML = "No Possible Times";
}


function disableCalendar(){
    var eHeaders = document.querySelectorAll(".cal-header-item");
    var eDayHeaders = document.querySelectorAll(".cal-days");
    var eDays = document.querySelectorAll(".cal-day");
    eHeaders.forEach(elt => elt.classList.add("cal-disabled"));
    eDayHeaders.forEach(elt => elt.classList.add("cal-disabled"));
    eDays.forEach(function (elt){
        elt.classList.add("cal-disabled");
        elt.classList.remove("selectable");
    });
}
