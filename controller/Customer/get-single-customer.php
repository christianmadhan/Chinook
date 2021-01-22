<?php


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
            $stmt = $customer->GetOne($customerId);
            $num = $stmt->rowCount();
            
            if($num>0){
              

                $customer_arr["customer"]=array();
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
                    extract($row);
              
                    $customer_item=array(
                        "CustomerId" => $CustomerId,
                        "FirstName" => $FirstName,
                        "LastName" => $LastName,
                        "Password" => $Password,
                        "Company" => $Company,
                        "Address" => $Address,
                        "City" => $City,
                        "State" => $State,
                        "Country" => $Country,
                        "PostalCode" => $PostalCode,
                        "Phone" => $Phone,
                        "Fax" => $Fax,
                        "Email" => $Email
                    );
              
                    array_push($customer_arr["customer"], $customer_item);
                }

                http_response_code(200);
              
                echo json_encode($customer_arr["customer"]);
            } else {
              
                http_response_code(404);
                echo json_encode(
                    array("message" => "No Customers found")
                );
            }

        } else {
            http_response_code(401);
            echo "EXPIRED!";
        }

} else {
    http_response_code(401);
}

?>