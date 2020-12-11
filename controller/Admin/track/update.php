<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../../config/database.php';
include_once '../../../Model/Admin.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$admin = new Admin($db);

$data = json_decode(file_get_contents('php://input'), true);

$res = $admin->UpdateTrack($data);

if($res){
    http_response_code(200);
    $resArray = array("response" => "Success");
    echo json_encode($resArray);
} else {
    http_response_code(500);
    $resArray = array("response" => "Error");
    echo json_encode($resArray);
}

  
  
// no products found will be here

?>