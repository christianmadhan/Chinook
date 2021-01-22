<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../../config/database.php';
include_once '../../../model/admin.php';
include_once '../../../model/auth.php';

// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$admin = new Admin($db);
$auth = new Auth($db);

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data)){
    if(isset($data['auth'])){
        $descrypted = $auth->auth_decrypt($data['auth'], true);
        $decoded = json_decode($descrypted, true);
        if($decoded['authState'] == "Authenticated" && $decoded['access'] == "admin"){
            $res = $admin->CreateTrack($data);

            if($res){
                http_response_code(200);
                $resArray = array("response" => "Success");
                echo json_encode($resArray);
            } else {
                http_response_code(500);
                $resArray = array("response" => "Error");
                echo json_encode($resArray);
            }
        } else {
            http_response_code(401);
        }
    } else {
        http_response_code(422);
        echo "data missing";
    }
} else {
    http_response_code(422);
    echo "data missing";
}
?>