<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    $dbPath = $path . "/scripts/conn.php";
    require_once($dbPath);

    $forename = $_POST["forename"];
    $surname = $_POST["surname"];
    $contactNo = $_POST["contactNo"];
    $date = $_POST["date"];
    $serviceId = $_POST["serviceId"];
    $staffId = 1;
    
    $start = $_POST["startTime"];
    $end = $_POST["endTime"];
    $price = $_POST["price"];

    function client_exists($forename,$surname,$num){
        global $db;
        $sql = "SELECT COUNT(*) AS 'exists' FROM client WHERE first_name = ? AND surname = ? AND contact_phone = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("sss",$forename,$surname,$num);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        while ($row = $result->fetch_assoc()) {
            if($row["exists"]>0){ 
                return TRUE; 
            }
            else{ 
                return FALSE;
            }  
        };
   
    }

    if (client_exists($forename,$surname,$contactNo)){
        $sql = "SELECT id FROM client WHERE first_name = ? AND surname = ? AND contact_phone = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("sss",$forename,$surname,$contactNo);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        while ($row = $result->fetch_assoc()) {
            $CLIENT_ID = $row["id"];
        };
    }
    else {
        $sql = "INSERT INTO client (first_name, surname, contact_phone) VALUES (?,?,?) ";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("sss",$forename,$surname,$contactNo);
        $stmt->execute();
        $CLIENT_ID = $stmt->insert_id;
        $stmt->close();
    }

    $sql = "INSERT INTO appointment (date,client_id,service_id,staff_id,start_time,end_time_expected,price_quoted,booked_by) VALUES (?,?,?,?,?,?,?,'CUSTOMER_ONLINE')";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("siiissi",$date,$CLIENT_ID,$serviceId,$staffId,$start,$end,$price);
    $stmt->execute();
    $BOOKINGREF = $stmt->insert_id;
    $stmt->close();
     
    $title = "";
    $sql = "SELECT service.title, appointment.date FROM service, appointment WHERE appointment.ref = ? AND appointment.service_id = service.id";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("s",$BOOKING_REF);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    while ($row = $result->fetch_assoc()) {
        $title = $row["title"];
    };
    $d = date("l F jS Y", strtotime($date));
    $am = date("h:i a", strtotime($start));
    $pm = date("h:i a", strtotime($end));

    $responseString = "Thank you for your booking. Your appointment details are as follows <br><br>$title $d $am - $pm<br><br>Please take note of these details - you will not be able to retrieve them once you click confirm.";
    $db->close();  
    
  
   $responseString;
    
    echo $responseString;
