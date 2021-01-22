<?php
/** 
 * @api {post} /controller/cart/get-cart.php get cart
 * @apiName GetCart
 * @apiGroup Cart
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
 *      auth: "example"
 *     }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
 *   {
 *       {
 *   "BillingInfo": [
 *       {
 *           "Address": "katrinedal 16",
 *           "City": "Svinninge",
 *           "State": "Sjælland",
 *           "Country": "Danmark",
 *           "PostalCode": "4520"
 *       }
 *   ],
 *   "InvoiceLine": [
 *       {
 *           "Quantity": "1",
 *           "UnitPrice": "0.99",
 *           "Name": "Walk On Water"
 *       }]
 *     }
 *   }
 * 
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 * 
 * 
 */
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/auth.php';
include_once '../../model/cart.php';
include_once '../../model/customer.php';


// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$cart = new Cart($db);

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
            $invoiceId = $decoded['InvoiceId'];
            $billingInfo = $cart->getCustomerBillingInformation($customerId);
            $updateStatus = $cart->getCart($invoiceId);
            $info = json_encode(array_merge(json_decode($billingInfo, true),json_decode($updateStatus, true)));
            echo $info;
        } else {
            http_response_code(401);
            $res = array("response" => "Token expired");
            echo json_encode($res);
        }

} else {
    http_response_code(401);
    echo "Not authenticated";
}
?>