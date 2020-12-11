<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    // include database and object files
    include_once '../../config/database.php';
    include_once '../../Model/auth.php';
    include_once '../../Model/cart.php';
    include_once '../../Model/customer.php';

    
    // instantiate database and product object
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
       // http_response_code(500);
        echo "WOW";
    }
} else {
    http_response_code(405);
    $res = array("response" => "method not allowed");
    echo json_encode($res);
}
?>