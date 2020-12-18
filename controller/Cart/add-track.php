<?php

/** 
 * @api {post} /controller/cart/add-track.php add track
 * @apiName AddTrackToCart
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
 *    auth: "example"
 *    trackId: 10,
 *    quantity: 2,
 *    invoiceId: 416,
 *    unitPrice: 0.99
 *     }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
 *   {
 *       response: "Success"
 *   }
 * 
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 * @apiError TracIdEmptyOrInvalidError the trackId was either not supplied or doesn't exit in the database.
 * @apiError QuantityEmptyOrNotAllowedError the quantiy was either not supplied or is greate than 10 which is the maximun quantity allowed.
 * @apiError InvoiceIdEmptyOrInvalidError the invoiceId was either not supplied or doesn't exit in the database.
 * @apiError UnitPriceEmptyOrNotANumberError the unitPrice was either not supplied or is not an integer.
 * 
 * 
 */


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
                $customerId = $decoded['CustomerId'];
                $invoiceId = $decoded['InvoiceId'];
                $updateStatus = $cart->addTrackToCart($data, $customerId, $invoiceId);
                if($updateStatus) {
                    http_response_code(200);
                    $res = array("response" => "Track Successfully purchased");
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
} else {
    http_response_code(405);
    $res = array("response" => "method not allowed");
    echo json_encode($res);
}
?>