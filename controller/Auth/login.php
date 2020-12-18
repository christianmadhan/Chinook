<?php
/** 
 * @api {post} /controller/auth/login.php login user.
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 0.0.0
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Access-Control-Allow-Origin": "*"
 *   "Content-Type": "application/json; charset=UTF-8"
 * 
 * }
 * @apiParam {json} auth a valid auth token is required.
 * 
 *  * @apiParamExample {json} Request-Example:
 *     {
 *      "Email": "example@email.dk",
 *      "Password": "example"
 *     }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
 *   {
 *      "auth token"
 *   },
 * 
 * @apiError InvalidDataSupplied the fields Email/Password was not included in post body.
 * @apiError Unauthorized Email and password were incorrect / or doesnt not exits in system.
 * 
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/auth.php';

// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$auth = new Auth($db);

$data = json_decode(file_get_contents('php://input'), true);

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