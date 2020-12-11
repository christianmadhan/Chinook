<?php
class Customer{
  
    // database connection and table name
    private $conn;
    private $table_name = "customer";
  
    // object properties
    public $CustomerId;
    public $FirstName;
    public $LastName;
    public $Password;
    public $Company;
    public $Address;
    public $City;
    public $State;
    public $Country;
    public $PostalCode;
    public $Phone;
    public $Fax;
    public $Email;


  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
function GetAll(){
  
    // select all query
    $query = "SELECT * FROM CUSTOMER";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // execute query
    $stmt->execute();
  
    return $stmt;
}

function GetOne($data) {
    $id = htmlspecialchars($data);
        // select all query
    $query = "SELECT * FROM CUSTOMER WHERE CustomerId = $id";
            // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // execute query
    $stmt->execute();

    return $stmt;
}

function createNewUser($Email, $HashedPassword) {
    $created = null;
    $query  = $this->conn->prepare("INSERT INTO `customer` (`Password`,`Email`) VALUES (:hashedPassword,:email)");
    $query->bindParam(':hashedPassword', $HashedPassword);
    $query->bindParam(':email', $Email);
    if ($query->execute()) {
        $id = $this->conn->lastInsertId();
        $queryInvoice  = $this->conn->prepare("INSERT INTO `invoice`(`CustomerId`) VALUES (:customerId)");
        $queryInvoice->bindParam(':customerId', $id);
        if($queryInvoice->execute()){
            $created = $id;
        }
      }
      return $created;
}

function checkIfEmailExits($data){
    $Email = htmlspecialchars($data['Email']);
    // select all query
    $query = "SELECT EMAIL FROM customer WHERE Email = '$Email'";
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute();
    return $stmt;
}

function checkIfEmailAndPasswords($data) {
    $EmailValidated = false;
    $PasswordValidated = false;

    $Email = $data['Email'];
    $Password = $data['Password'];
    $RepeatPassword = $data['RepeatPassword'];

    if (filter_var($Email, FILTER_VALIDATE_EMAIL)) {
        $EmailValidated = true;
    }
    if ($Password == $RepeatPassword) {
        $PasswordValidated = true;
    }

    if($EmailValidated == true && $PasswordValidated == true){
        return true;
    } else {
        return false;
    }
    
}

function updateCustomer($data, $customerId){
    $Email = htmlspecialchars($data['Email']);                                                  
    $Firstname = htmlspecialchars($data['Firstname']);
    $Lastname = htmlspecialchars($data['Lastname']);
    $Company = htmlspecialchars($data['Company']);
    $Address = htmlspecialchars($data['Address']);
    $City = htmlspecialchars($data['City']);
    $State = htmlspecialchars($data['State']);
    $Country = htmlspecialchars($data['Country']);
    $PostalCode = htmlspecialchars($data['PostalCode']);
    $Phone = htmlspecialchars($data['Phone']);
    $Fax = htmlspecialchars($data['Fax']);

    $query  = $this->conn->prepare("UPDATE `customer` SET `FirstName`=:Firstname,`LastName`=:Lastname, `Company`=:Company,`Address`=:Address,`City`=:City,`State`=:State,`Country`=:Country,`PostalCode`=:PostalCode,`Phone`=:Phone,`Fax`=:Fax,`Email`=:Email WHERE CustomerId = :CustomerId");
    $query->bindParam(':Firstname', $Firstname);
    $query->bindParam(':Lastname', $Lastname);
    $query->bindParam(':Company', $Company);
    $query->bindParam(':Address', $Address);
    $query->bindParam(':City', $City);
    $query->bindParam(':State', $State);
    $query->bindParam(':Country', $Country);
    $query->bindParam(':PostalCode', $PostalCode);
    $query->bindParam(':Phone', $Phone);
    $query->bindParam(':Fax', $Fax);
    $query->bindParam(':Email', $Email);
    $query->bindParam(':CustomerId', $customerId);

    if ($query->execute()) {
        return true;
      } else{
        return false;
      }
}

}
?>