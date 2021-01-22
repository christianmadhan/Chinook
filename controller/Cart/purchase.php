<?php
/** 
 * @api {post} /controller/cart/purchase.php purchase items from cart
 * @apiName PurchaseCart
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
 *   "auth": "example",
 *   "Total": 12.0,
 *   "Address": "Katrinedal 16",
 *   "City": "Svinninge",
 *   "State": "Sjælland",
 *   "Country": "Denmark",
 *   "PostalCode": "4520"
 *     }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
 *   {
 *    "response": "Successfully Purchased"
 *   }
 * 
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 * @apiError BillingInformationNotfulliedError missing billing information - make sure that everything is included in post body.
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
                // // query customers
                $customerId = $decoded['CustomerId'];
                $invoiceId = $decoded['InvoiceId'];
                $purchaseStatus = $cart->purchase($data, $customerId, $invoiceId);
                if($purchaseStatus) {
                    http_response_code(200);
                    $res = array("response" => "Successfully Purchased");
                    echo json_encode($res);
                } else {
                    http_response_code(500);
                    $res = array("response" => "Failure");
                    echo json_encode($res);
                }
            } else {
                http_response_code(401);
                $res = array("response" => "Token expired");
                echo json_encode($res);
            }
    
    } else {
        http_response_code(500);
    }
?>