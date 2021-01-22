<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/auth.php';

// instantiate database and db object
$database = new Database();
$db = $database->getConnection();
  
$data = json_decode(file_get_contents('php://input'), true);
$auth = new Auth($db);

if(isset($data)){

        $descrypted = $auth->auth_decrypt($data['auth'], true);
        $decoded = json_decode($descrypted, true);
        if($decoded['authState'] == "Authenticated"){
            $current = time();
            $expiresAt = $decoded['expiresAt'];
            $expired =  $expiresAt - $current;
            if($expired > 0) {
                http_response_code(200);
                
            } else {
                http_response_code(401);
                echo "Token Expired";
            }
        } else {
        http_response_code(401);
        echo "Token Expired";
    }
} else {
    http_response_code(401);
    echo "Data is wrongly formatted";
}

?>