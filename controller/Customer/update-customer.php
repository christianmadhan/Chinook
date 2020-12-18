<?php

/** 
 * @api {post} /controller/customer/update-customer.php Update customer
 * @apiName UpdateCustomer
 * @apiGroup Customer
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
*{
*    "auth": "example",
*    "Firstname": "christian",
*    "Lastname": "witt",
*    "Company": "Mærsk",
*    "Address": "Bakkesvinget",
*    "City": "Århus",
*    "State": "jylland",
*    "Country": "denmark",
*    "PostalCode": "2323",
*    "Phone": "1231232323",
*    "Fax": "12312544",
*    "Email": "example@email.dk"
*}
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
* [
*    {
*        "response": ""Customer updated"
*    }
* ]
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 * 
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/customer.php';
include_once '../../model/auth.php';


// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$customer = new Customer($db);
  
$data = json_decode(file_get_contents('php://input'), true);
$auth = new Auth($db);

$descrypted = $auth->auth_decrypt($data['auth'], true);
$decoded = json_decode($descrypted, true);

if($decoded['authState'] == "Authenticated"){
        $current = time();
        $expiresAt = $decoded['expiresAt'];
        $expired =  $expiresAt - $current;
        if($expired > 0) {

            $customerId = $decoded['CustomerId'];
            $updateStatus = $customer->updateCustomer($data, $customerId);
            if($updateStatus) {
                http_response_code(200);
                echo json_encode("Customer updated");
            } else {
                echo json_encode("Failure");
            }
        } else {
            http_response_code(401);
            echo "Token EXPIRED!";
        }

} else {
    http_response_code(500);
}

?>