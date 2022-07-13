let DisplayMonth;
let DisplayYear;
let MAX_MONTH_ADVANCE = 3;
let MIN_DAY_ADVANCE = 1;

let UserDateButton = null;

let Service = null;
let Price = 0;
let UserDate = null;
let Time = null;
let FirstName = null;
let LastName = null;
let ContactNo = null;

window.onload = function () {
  console.log('Salah Barber running Javascript');
  let now = new Date();
  console.log(now);
  DisplayMonth = now.getMonth() + 1;
  DisplayYear = now.getFullYear();

  PopulateCalendar(DisplayMonth, DisplayYear);
};

function PopulateCalendar(targetMonth = null, targetYear = null) {
  if (targetMonth == null && targetYear == null) {
    var now = new Date();
    targetMonth = now.getMonth() + 1;
    targetYear = now.getFullYear();
  }

  setCalendarHeader(targetMonth, targetYear);
  setCalendarBody(targetMonth, targetYear);
}

function setCalendarHeader(month, year) {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  var header = document.getElementsByClassName('calendar-month');
  Array.from(header).forEach((e) => {
    e.innerHTML = MONTHS[month - 1] + ' ' + year;
  });
}

function setCalendarBody(month, year) {
  var now = new Date();
  var additionalDatesThisMonth = getAvailableDates(month, year);
  var unavailableDatesThisMonth = getUnavailableDates(month, year);
  var workingDays = getWorkingDays();

  let iMonth = month - 1;
  let d = new Date(year, iMonth);
  now.setUTCHours(0, 0, 0, 0);

  var table = document.getElementsByClassName('calendar-days');
  Array.from(table).forEach((e) => {
    e.innerHTML = '';
  });

  var tableBody = '';
  for (let i = 0; i < getDay(d); i++) {
    tableBody += '<td></td>';
  }

  let dateCutoff = new Date(now);
  dateCutoff.setDate(dateCutoff.getDate() + MIN_DAY_ADVANCE);

  while (d.getMonth() == iMonth) {
    let added = false;
    let dateValue = d.toLocaleString('en-GB');

    // Date preceeds "now"
    if (
      d.getDate() < dateCutoff.getDate() &&
      d.getMonth() <= dateCutoff.getMonth() &&
      d.getFullYear() <= dateCutoff.getFullYear()
    ) {
      tableBody +=
        '<td><button type="button" class="btn btn-link text-decoration-none text-muted p-sm-1 p-0 pe-none" value="' +
        dateValue +
        '">' +
        d.getDate() +
        '</button></td>';
      added = true;
    }

    additionalDatesThisMonth.forEach((e) => {
      let start = new Date(e[0]);
      let end = new Date(e[1]);

      if (
        d.getDate() >= start.getDate() &&
        d.getMonth() >= start.getMonth() &&
        d.getFullYear() >= start.getFullYear() &&
        d.getDate() <= end.getDate() &&
        d.getMonth() <= end.getMonth() &&
        d.getFullYear() <= end.getFullYear() &&
        !added
      ) {
        tableBody +=
          '<td><button type="button" class="btn btn-outline-warning text-decoration-none text-black p-sm-1 p-0" value="' +
          dateValue +
          '" onclick="DateSelected(this)">' +
          d.getDate() +
          '</button></td>';
        added = true;
      }
    });

    unavailableDatesThisMonth.forEach((e) => {
      let start = new Date(e[0]);
      let end = new Date(e[1]);

      if (
        d.getDate() >= start.getDate() &&
        d.getMonth() >= start.getMonth() &&
        d.getFullYear() >= start.getFullYear() &&
        d.getDate() < end.getDate() &&
        d.getMonth() <= end.getMonth() &&
        d.getFullYear() <= end.getFullYear() &&
        !added
      ) {
        tableBody +=
          '<td><button type="button" class="btn btn-link text-decoration-none text-muted p-sm-1 p-0 pe-none" value="' +
          dateValue +
          '">' +
          d.getDate() +
          '</button></td>';
        added = true;
      }
    });

    if (workingDays.includes(d.getDay()) && !added) {
      tableBody +=
        '<td><button type="button" class="btn btn-outline-warning text-decoration-none text-black p-sm-1 p-0" value="' +
        dateValue +
        '" onclick="DateSelected(this)">' +
        d.getDate() +
        '</button></td>';
      added = true;
    }

    if (!added) {
      tableBody +=
        '<td><button type="button" class="btn btn-link text-decoration-none text-muted p-sm-1 p-0 pe-none" value="' +
        dateValue +
        '">' +
        d.getDate() +
        '</button></td>';
    }

    if (getDay(d) % 7 == 6) {
      tableBody += '</tr><tr>';
    }

    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      tableBody += '<td></td>';
    }
  }

  tableBody += '</tr>';

  Array.from(table).forEach((e) => {
    e.innerHTML = tableBody;
  });
}

function getDay(date) {
  let day = date.getDay();
  if (day == 0) {
    day = 7;
  }
  return day - 1;
}

function CalendarNextMonth() {
  let currentMonthDisplayed = DisplayMonth - 1;

  if (currentMonthDisplayed == new Date().getMonth() + MAX_MONTH_ADVANCE) {
    console.log('Cannot go forward');
    return;
  }

  DisplayMonth++;
  if (DisplayMonth == 13) {
    DisplayMonth = 1;
    DisplayYear++;
  }

  UserDate = null;
  PopulateCalendar(DisplayMonth, DisplayYear);
  resetTimeSelection();
}

function CalendarPrevMonth() {
  let currentMonthDisplayed = DisplayMonth - 1;

  if (currentMonthDisplayed == new Date().getMonth()) {
    return;
  }

  DisplayMonth--;
  if (DisplayMonth == 0) {
    DisplayMonth = 12;
    DisplayYear--;
  }

  UserDate = null;
  PopulateCalendar(DisplayMonth, DisplayYear);
  resetTimeSelection();
}

function ServiceSelected(serviceSelect) {
  var service = serviceSelect.split('-');
  var serviceId = service[0];
  if (serviceId == '') {
    Service = null;
    return;
  }

  Service = serviceId;
  Price = service[1];
  AcceptClientDetails();
}

function DateSelected(date) {
  if (UserDateButton) {
    UserDateButton.classList.remove('active');
  }

  date.classList.add('active');
  UserDateButton = date;

  let values = date.value.split('/');
  values[2] = values[2].split(',')[0];

  UserDate = values[2] + '-' + values[1] + '-' + values[0];

  PopulateTimeInput();
  AcceptClientDetails();
}

function PopulateTimeInput() {
  resetTimeSelection;

  var timeInput = document.getElementById('timeInput');

  if (timeInput.hasAttribute('disabled')) {
    timeInput.removeAttribute('disabled');
  }

  let timeSlots = getAvailableTimes();

  timeSlots.forEach((time) => {
    var start = time[0];
    var end = time[1];

    var option = document.createElement('option');
    option.text = convertAMPM(start);
    option.setAttribute('value', start + '-' + end);
    timeInput.add(option);
  });
}

function resetTimeSelection() {
  Time = null;

  var selectOptions = document.getElementById('timeInput');
  selectOptions.innerHTML = '<option selected value="">Select a time</option>';
}

function getAvailableTimes() {
  var timeSlot = getAppointmentTimes(UserDate);
  return timeSlot;
}

function convertAMPM(time) {
  var timedata = time.split(':');
  var hours = timedata[0];
  var minutes = timedata[1];
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function TimeSelected(time) {
  Time = time;
  console.log(time);
  if (Service == null || UserDate == null || Time == null) {
    return;
  }

  AcceptClientDetails();
}

function AcceptClientDetails() {
  let enable = Service != null && UserDate != null && Time != null;

  var firstNameInput = document.getElementById('firstName');
  var lastNameInput = document.getElementById('lastName');
  var contactNoInput = document.getElementById('contactNumber');

  if (enable) {
    if (firstNameInput.hasAttribute('disabled')) {
      firstNameInput.removeAttribute('disabled');
    }
    if (lastNameInput.hasAttribute('disabled')) {
      lastNameInput.removeAttribute('disabled');
    }
    if (contactNoInput.hasAttribute('disabled')) {
      contactNoInput.removeAttribute('disabled');
    }
  } else {
    if (!firstNameInput.hasAttribute('disabled')) {
      firstNameInput.setAttribute('disabled', true);
    }
    if (!lastNameInput.hasAttribute('disabled')) {
      lastNameInput.setAttribute('disabled', true);
    }
    if (!contactNoInput.hasAttribute('disabled')) {
      contactNoInput.setAttribute('disabled', true);
    }
  }
}

function Submit() {
  var form = document.getElementById('booking-form');
  if (form.classList.contains('d-none')) {
    form.classList.remove('d-none');

    var bookingConfirm = document.getElementById('bookingConfirm');
    bookingConfirm.classList.add('d-none');
    bookingConfirm.innerHTML = '';

    var modalTitle = document.getElementById('bookingModalTitle');
    modalTitle.innerHTML = 'Book Now';

    return;
  }

  _firstName = document.getElementById('firstName').value;
  _lastName = document.getElementById('lastName').value;
  _contactNo = document.getElementById('contactNumber').value;

  _firstName = _firstName.trim().toLowerCase();
  FirstName = _firstName.charAt(0).toUpperCase() + _firstName.slice(1);

  if (FirstName == ""){
    FirstName = null;
  }

  _lastName = _lastName.trim().toLowerCase();
  LastName = _lastName.charAt(0).toUpperCase() + _lastName.slice(1);

  if (LastName == ""){
    LastName = null;
  }

  ContactNo = _contactNo.trim();

  if (ContactNo == ""){
    ContactNo = null;
  }

  let isContactNoValid = true;

  if (_contactNo.length != 11) {
    isContactNoValid = false;
  }

  for (let c of _contactNo) {
    if (isNaN(parseInt(c, 10))) {
      isContactNoValid = false;
    }
  }

  if (Service == null || Price == null || UserDate == null || Time == null || FirstName == null || LastName == null || ContactNo == null ){
    return;
  }

  var startEnd = Time.split('-');

  $.ajax({
    method: 'POST',
    url: 'scripts/create_new_appointment.php',  
    data: {
      forename: FirstName,
      surname: LastName,
      contactNo: ContactNo,
      date: UserDate,
      serviceId: Service,
      startTime: startEnd[0],
      endTime: startEnd[1],
      price: Price,
    },
    success: function (data) {
      bookingComplete(data);
    },
  });
}

function bookingComplete(confirmMessage) {
  
  Service = null;
  Price = 0;
  UserDate = null;
  Time = null;
  FirstName = null;
  LastName = null;
  ContactNo = null;

  var serviceInput = document.getElementById('serviceInput');
  serviceInput.selectedIndex = '0';

  if (UserDateButton) {
    UserDateButton.classList.remove('active');
  }

  resetTimeSelection();

  _firstName = document.getElementById('firstName');
  _lastName = document.getElementById('lastName');
  _contactNo = document.getElementById('contactNumber');

  _firstName.value = "";
  _lastName.value = "";
  _contactNo.value = "";

  var form = document.getElementById('booking-form');
  form.classList.add('d-none');



  var modalTitle = document.getElementById('bookingModalTitle');
  modalTitle.innerHTML = 'Booking Confirmed';

  var bookingConfirm = document.getElementById('bookingConfirm');
  bookingConfirm.classList.remove("d-none");

  var p = document.createElement("p");
  p.innerHTML = confirmMessage;

  bookingConfirm.appendChild(p);
}

function getRequest(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open('GET', url, false);
  xhttp.send();
}

function getAppointmentTimes(date) {
  var ls = [];
  function getFunction(xhttp) {
    var response = JSON.parse(xhttp.responseText);
    ls = response;
  }
  getRequest('/scripts/get_appointment_times.php?date=' + date, getFunction);
  return ls;
}

function getAvailableDates(month, year) {
  var dateStr = [
    ['2022-07-19', '2022-07-21'],
    ['2022-07-23', '2022-07-23'],
  ];

  var dates = [];
  dateStr.forEach((e) => {
    var period = [];
    period.push(new Date(e[0]));
    period.push(new Date(e[1]));

    dates.push(period);
  });
  return dates;
}

function getWorkingDays() {
  var days = [2, 3, 4, 5, 6];
  return days;
}

function getUnavailableDates(month, year) {
  var dateStr = [
    ['2022-07-22', '2022-07-22'],
    ['2022-09-22', '2022-09-27'],
  ];

  var dates = [];
  dateStr.forEach((e) => {
    var period = [];
    period.push(new Date(e[0]));
    period.push(new Date(e[1]));

    dates.push(period);
  });
  return dates;
}
