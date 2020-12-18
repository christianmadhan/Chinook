<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and admin file
include_once '../../../config/database.php';
include_once '../../../model/admin.php';

// instantiate database and db object.
$database = new Database();
$db = $database->getConnection();

// initialize admin object
$admin = new Admin($db);

// gets json data from request body.
$data = json_decode(file_get_contents('php://input'), true);

// executes createalbum method within admin class.
$res = $admin->CreateAlbum($data);

// validate res
if($res){
    http_response_code(200);
    $resArray = array("response" => "Success");
    echo json_encode($resArray);
} else {
    http_response_code(500);
    $resArray = array("response" => "Error");
    echo json_encode($resArray);
}
?>