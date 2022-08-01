<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$dbPath = $path . "/scripts/conn.php";
include_once($dbPath);

$serviceSQL = "SELECT id,title,price,duration FROM service WHERE type = 'GENTS' AND is_public = 1;";
$serviceSQLResult = $db->query($serviceSQL);
$services = $serviceSQLResult->fetch_all();
$db->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" />
  <!-- JavaScript Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


  <link rel="stylesheet" href="hero.css" />
  <link rel="stylesheet" href="main.css" />
  <link rel="icon" href="favicon.ico" />

  <title>Salah Barber East Kilbride</title>
  <meta name="description" content="Experienced barber Salah has been serving the East Kilbride area for over 20 years. Now based at Styles and Smiles in The Village East Kilbride. Services by appointment only, phone or book online today!"/>
</head>

<body style="margin: 0">
  <!-- Book Now Button -->
  <div class="container-fluid position-fixed" style="bottom: 10px">
    <div class="row">
      <div class="container col-sm-12 col-lg-10">
        <button type="button" class="booking-button btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#bookingModal">
          Book Now
        </button>
      </div>
    </div>
  </div>

  <!-- Nav -->
  <nav class="navbar navbar-default navbar-expand-lg navbar-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="static/hair1.svg" alt="" width="50" height="50" class="d-inline align-text-top" /></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#find">Find</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#looks">Looks</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#pricing">Pricing</a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link" data-bs-toggle="modal" data-bs-target="#bookingModal">Book</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero d-flex align-items-center justify-content-center">
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-3">
        <div class="col-10 col-sm-8 col-lg-6 hero-image-container">
          <div class="hero-image"></div>
        </div>

        <div class="col-lg-6">
          <div class="row">
            <h1 class="display-1 lh-1 mb-3 fw-semibold">Salah Barber</h1>
            <h2 class="lead mb-3">
              A haircut should not only make you look good, but feel good!
            </h2>
            <button type="button" class="booking-button btn btn-warning w-auto mx-2" data-bs-toggle="modal" data-bs-target="#bookingModal">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container-fluid">
    <div class="row">
      <section id="find" class="container-fluid bg-dark">
        <div class="container col-xxl-8 px-4 py-5">
          <section class="mb-4">
            <div class="d-flex text-light justify-content-center">
              <p class="fs-2 fw-light text-center">
                Now based at <br />
                Styles & Smiles - Hair & Wellbeing<br />
                <a href=" http://maps.google.com/?q=14 Pankhurst Pl, East Kilbride, Glasgow G74 4BH" class="text-decoration-none text-white">14 Pankhurst Place, East Kilbride, G74 4BH
                </a>
              </p>
            </div>
          </section>

          <section id="opening" class="opening">
            <div class="row">
              <table class="table table-dark">
                <tr>
                  <td>Monday</td>
                  <td>Closed</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>9AM - 6PM</td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>9AM - 7.30PM</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>9AM - 6PM</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>9AM - 6PM</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>9AM - 5PM</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>Closed</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </section>
    </div>
  </section>

  <div class="container-fluid" id="looks">
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row d-flex flex-wrap p-4">
        <div class="photo-col">
          <img src="static/gallery/example1.jpg" />
          <img src="static/gallery/example2.jpg" />
        </div>
        <div class="photo-col">
          <img src="static/gallery/example3.jpg" />
          <img src="static/gallery/example4.jpg" />
        </div>
        <div class="photo-col d-md-block d-none">
          <img src="static/gallery/example5.jpg" />
          <img src="static/gallery/example6.jpg" />
        </div>
      </div>
    </div>
  </div>

  <section class="container-fluid">
    <div class="row">
      <section id="pricing" class="container-fluid bg-light">
        <div class="container col-xxl-8 px-4 py-5">
          <h2>Pricing</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Service</th>

                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <?php
              foreach ($services as list($id, $title, $price, $duration)) {
                echo "<tr><th scope=\"row\">$title</th><td>£$price</td></tr>";
              };
              ?>
            </tbody>
          </table>
          <div class="my-5"></div>
        </div>
      </section>
    </div>
  </section>

  <section class="booking">
    <div class="modal fade" id="bookingModal" tabindex="-1" role="dialog" aria-labelledby="bookingModalTitle" aria-hidden="true">
      <div class="modal-dialog" role="">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="bookingModalTitle">Book Now</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="booking-form" class="needs-validation" novalidate>
              <div class="mb-4">
                <label for="dateInput" class="form-label">Date</label>
                <!-- Insert Calendar -->
                <div class="row col-7">
                  <div class="calendar-container">
                    <div class="calendar-header d-flex w-100">
                    </div>
                    <table class="calendar-body table table-fixed text-center">
                      <thead>
                        <tr>
                          <td>
                            <button type="button" class="calendar-back btn btn-link p-0" onclick="CalendarPrevMonth()"><img src="static/arrow-left.svg" /></button>
                          </td>
                          <td colspan="5">
                            <div class="calendar-month text-center"></div>
                          </td>
                          <td>
                            <button type="button" class="calendar-next btn btn-link p-0" onclick="CalendarNextMonth()"><img src="static/arrow-right.svg" /></button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="col" class="calendar-header">Mo</th>
                          <th scope="col" class="calendar-header">Tu</th>
                          <th scope="col" class="calendar-header">We</th>
                          <th scope="col" class="calendar-header">Th</th>
                          <th scope="col" class="calendar-header">Fr</th>
                          <th scope="col" class="calendar-header">Sa</th>
                          <th scope="col" class="calendar-header">Su</th>
                        </tr>
                      </thead>
                      <tbody class="calendar-days"></tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="timeInput" class="form-label">Time</label>
                <select id="timeInput" class="form-select" aria-label="Select a time" onchange="TimeSelected(this.value)" disabled>
                  <option selected value="">Select a time</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="serviceInput" class="form-label">Service</label>
                <select id="serviceInput" class="form-select" aria-label="Select a service" onchange="ServiceSelected(this.value)">
                  <option selected value="">Select a service</option>
                  <?php
                  foreach ($services as list($id, $title, $price)) {
                    echo "<option value ='$id-$price'>$title (£$price)</option>";
                  };
                  ?>
                </select>
              </div>
              <hr />
              <div class="mb-3">
                <label for="name" class="form-label">Name for booking</label>
                <div class="row">
                  <div class="col">
                    <input id="firstName" type="text" class="form-control" placeholder="First name" aria-label="First name" disabled />
                  </div>
                  <div class="col">
                    <input id="lastName" type="text" class="form-control" placeholder="Last name" aria-label="Last name" disabled />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="contactNumber" class="form-label">Contact Number</label>
                <input id="contactNumber" type="tel" class="form-control" disabled />
              </div>
            </form>
            <div id="bookingConfirm" class="bookingConfirm d-none" ></div>
          </div>
          <div class="modal-footer">
            <button type="button" id="bookingCancel" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" id="bookingSubmit" class="btn btn-warning" onclick="Submit()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script src="main.js"></script>
</body>
</html>