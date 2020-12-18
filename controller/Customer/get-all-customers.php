<?php

/** 
 * @api {get} /controller/customer/get-all-customer.php get all customers
 * @apiName GetAllCustomer
 * @apiGroup Customer
 * @apiVersion 0.0.0
 * 
 * @apiDescription Only used for testing
 * This endpoint will need to be removed at one point
 * Since it exposes sensitive information.
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Access-Control-Allow-Origin": "*"
 *   "Content-Type": "application/json; charset=UTF-8"
 * }
 * 
 * @apiSuccessExample Example data on success: 
* [
*    {
*        "CustomerId": "1",
*        "FirstName": "Luís",
*        "LastName": "Gonçalves",
*        "Password": "$2y$10$WtD6WywiBP7qNi8yZj7gYuIhjTy1xsAwAKSEgXj/ftRZWTLjz1cpu",
*        "Company": "Embraer - Empresa Brasileira de Aeronáutica S.A.",
*        "Address": "Av. Brigadeiro Faria Lima, 2170",
*        "State": "SP",
*        "Country": "Brazil",
*        "PostalCode": "12227-000",
*        "Phone": "+55 (12) 3923-5555",
*        "Fax": "+55 (12) 3923-5566",
*        "Email": "luisg@embraer.com.br"
*    },
*  ]
* 
* 
* 
*/

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/customer.php';

// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$customer = new Customer($db);

$stmt = $customer->GetAll();
$num = $stmt->rowCount();

if($num>0){
    $customer_arr["customers"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $customer_item=array(
            "CustomerId" => $CustomerId,
            "FirstName" => $FirstName,
            "LastName" => $LastName,
            "Password" => $Password,
            "Company" => $Company,
            "Address" => $Address,
            "State" => $State,
            "Country" => $Country,
            "PostalCode" => $PostalCode,
            "Phone" => $Phone,
            "Fax" => $Fax,
            "Email" => $Email
        );
  
        array_push($customer_arr["customers"], $customer_item);
    }

    http_response_code(200);

    echo json_encode($customer_arr["customers"]);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No Customers found.")
    );
}
?>