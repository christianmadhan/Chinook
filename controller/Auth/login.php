<?php 
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../Model/Auth.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$auth = new Auth($db);

$data = json_decode(file_get_contents('php://input'), true);
// query customers
$stmt = $auth->Login($data);
if(isset($stmt)){
    if($stmt['authState'] == "Authenticated"){
        $data = $auth->auth_encrypt($stmt);
        echo json_encode($data);
    } else {
        http_response_code(401);
        $message = '{"message":"login failed"}';
        echo var_dump($stmt);
    }
} else {
    http_response_code(500);
    echo "LOGIN FAILED!";
}

?>