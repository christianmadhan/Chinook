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
            // API URL
            $url = 'http://chinook-deploy-dev.us-east-1.elasticbeanstalk.com/controller/auth/login.php';

            // Create a new cURL resource
            $ch = curl_init($url);

            // Setup request to send json via POST
            $data = array(
            'Email' => $data['Email'],
            'Password' => $data['Password']
            );
            $payload = json_encode($data);

            // Attach encoded JSON string to the POST fields
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

            // Set the content type to application/json
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

            // Return response instead of outputting
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            // Execute the POST request
            $result = curl_exec($ch);
            echo $result;
            curl_close($ch);
        } else {
            echo 'SOMETHING BAD HAPPENED :(';
        }
    }
} else {
    echo 'data is not valid.';
}

?>