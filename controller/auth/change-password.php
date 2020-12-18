<?php
/** 
 * @api {post} /controller/auth/change-password.php change password
 * @apiName ChangePassword
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
 *      "auth": "example",
 *      "Password": "example"
 *     }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success:
 *  [   
 *   {
 *       response: "Success"
 *   },
 *  ]
 * 
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 * 
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/auth.php';
include_once '../../model/customer.php';

// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$auth = new Auth($db);
$customer = new Customer($db);

$data = json_decode(file_get_contents('php://input'), true);
$descrypted = $auth->auth_decrypt($data['auth'], true);
$decoded = json_decode($descrypted, true);

$customerId = $decoded['CustomerId'];
$newpassword = $data['Password'];
$result = $customer->changePassword($customerId, $newpassword);
if($result){
    echo json_encode("All good!");
} else {
    echo json_encode(":( !");
}
?>