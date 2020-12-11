<?php
class Cart{
  
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function addTrackToCart($data, $customerId, $invoiceId){
        $trackId = $data['trackId'];
        $quantity = $data['quantity'];
        $unitPrice = $data['unitPrice'];
        
        $query = "INSERT INTO INVOICELINE (`InvoiceId`,`TrackId`, `UnitPrice`, `Quantity`) VALUES (:invoiceId, :trackId, :unitPrice, :quantity)";
        $stmtInvoiceLine = $this->conn->prepare($query);
        $stmtInvoiceLine->bindParam(':trackId', $trackId, PDO::PARAM_STR);
        $stmtInvoiceLine->bindParam(':invoiceId', $invoiceId, PDO::PARAM_STR);
        $stmtInvoiceLine->bindParam(':quantity', $quantity, PDO::PARAM_STR);
        $stmtInvoiceLine->bindParam(':unitPrice', $unitPrice, PDO::PARAM_STR);
        if($stmtInvoiceLine->execute()){
            return true;
        } else {
            return false;
        }

    }

    function getCart($invoiceId){
        
        $query = "SELECT invoiceline.Quantity, invoiceline.UnitPrice, track.Name FROM invoiceline INNER JOIN track ON track.TrackId=invoiceline.TrackId WHERE invoiceline.InvoiceId = :invoiceId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':invoiceId', $invoiceId, PDO::PARAM_STR);
        $stmt->execute();
        $num = $stmt->rowCount();
        // // check if more than 0 record found
        if($num>0){
        
            // invoiceline array
            $invoiceline_arr["invoiceline"]=array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                // extract row
                // this will make $row['name'] to
                // just $name only
                extract($row);
        
                $invoiceline_item=array(
                    "Quantity" => $Quantity,
                    "UnitPrice" => $UnitPrice,
                    "Name" => $Name
                );
        
                array_push($invoiceline_arr["invoiceline"],  $invoiceline_item);
            }
        
            // set response code - 200 OK
            http_response_code(200);
            $InvoiceLineInfo = array(
                "InvoiceLine" => $invoiceline_arr["invoiceline"]
            );
            // show products data in json format
            return json_encode($InvoiceLineInfo);
        } else {
            // set response code - 404 Not found
            http_response_code(404);
        
            // tell the user no products found
            echo json_encode(
                array("message" => "No invoiceline found.")
            );
        }
    }

    function getCustomerBillingInformation($customerId){
        $query = "SELECT * FROM CUSTOMER WHERE CustomerId = $customerId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':customerId', $customerId, PDO::PARAM_STR);
        $stmt->execute();
        $num = $stmt->rowCount();
        // // check if more than 0 record found
        if($num>0){
        
            // invoiceline array
            $customer["billingInfo"]=array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                // extract row
                // this will make $row['name'] to
                // just $name only
                extract($row);
        
                $customer_item=array(
                    "Address" => $Address,
                    "City" => $City,
                    "State" => $State,
                    "Country" => $Country,
                    "PostalCode" => $PostalCode,
                );        
                array_push($customer["billingInfo"],  $customer_item);
            }      
            // set response code - 200 OK
            http_response_code(200);
            $customerBillingInfo = array(
                "BillingInfo" => $customer["billingInfo"]
            );
            // show products data in json format
            return json_encode($customerBillingInfo);
        } else {
            // set response code - 404 Not found
            http_response_code(404);     
            // tell the user no products found
            echo json_encode(
                array("message" => "No Customer found.")
            );
        }
    }

    function purchase($data, $customerId, $InvoiceId){
        $Address = htmlspecialchars($data['Address']);
        $City = htmlspecialchars($data['City']);
        $State = htmlspecialchars($data['State']);
        $Country = htmlspecialchars($data['Country']);
        $PostalCode = htmlspecialchars($data['PostalCode']);
        $Total = htmlspecialchars($data['Total']);
        $now = new DateTime('NOW');
        $InvoiceDate = $now->format('Y-m-d H:i:s');
    
        $query  = $this->conn->prepare("UPDATE `invoice` SET `BillingAddress`=:BillingAddress,`BillingCity`=:City,`BillingCountry`=:Country,`BillingPostalCode`=:PostalCode,`InvoiceDate`=:InvoiceDate,`Total`=:Total,`BillingState`=:BillingState WHERE CustomerId = :CustomerId AND  InvoiceId = :InvoiceId");
        $query->bindParam(':BillingAddress', $Address);
        $query->bindParam(':City', $City);
        $query->bindParam(':Country', $Country);
        $query->bindParam(':PostalCode', $PostalCode);
        $query->bindParam(':InvoiceDate', $InvoiceDate);
        $query->bindParam(':Total', $Total);
        $query->bindParam(':BillingState', $State);
        $query->bindParam(':CustomerId', $customerId);
        $query->bindParam(':InvoiceId', $InvoiceId);
    
        if ($query->execute()) {
            return true;
          } else{
            return false;
          }
    }

    function checkBillingStatus($customerId, $InvoiceId){
        $query  = $this->conn->prepare("SELECT  `invoice` SET `BillingAddress`=:BillingAddress,`BillingCity`=:City, WHERE CustomerId = :CustomerId AND  InvoiceId = :InvoiceId");
    }
}
?>