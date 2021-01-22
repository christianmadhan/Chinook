<?php 
/** 
 * @api {post} /controller/auth/newuser.php creates new user.
 * @apiName Create new user
 * @apiGroup Auth
 * @apiVersion 0.0.0
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Access-Control-Allow-Origin": "*"
 *   "Content-Type": "application/json; charset=UTF-8"
 * 
 * }
 * 
 *  * @apiParamExample {json} Request-Example:
 *     {
 *      "Email": "example@email.dk",
 *      "Password": "example",
 *      "RepeatPassword": "example"
 * 
 *     }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
 *   {
 *      "auth token"
 *   },
 * 
 * @apiError InvalidDataSupplied the fields Email/Password/RepeatPassword was not included in post body.
 * @apiError Unauthorized Email and password were incorrect / or doesnt not exits in system.
 * 
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/auth.php';
include_once '../../model/customer.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$auth = new Auth($db);
$customer = new Customer($db);

$data = json_decode(file_get_contents('php://input'), true);

$emailAndPasswordValidated = $customer->checkIfEmailAndPasswords($data);

if($emailAndPasswordValidated){
    $customerExits = $customer->checkIfEmailExits($data);
    $num = $customerExits->rowCount();
    if($num > 0){
        echo 'customer already exits';
    } else {
        $Email = $data['Email'];
        $hashedPassword = password_hash($data['Password'], PASSWORD_DEFAULT);
        $invoiceId = $customer->createNewUser($Email,$hashedPassword);
        if(isset($invoiceId)){
            http_response_code(200);
        } else {
            echo 'SOMETHING BAD HAPPENED :(';
        }
    }
} else {
    echo 'data is not valid.';
}

?>