<?php

class Auth {
    // database connection and table name
    private $conn;
    private $key = "#!SUPER_SECRET_KEY!#";
        // constructor with $db as database connection
    public function __construct($db){
            $this->conn = $db;
    }

    function Login($data){
        $email = htmlspecialchars($data["Email"]);
        $password = htmlspecialchars($data["Password"]);
        $query = "SELECT * FROM `customer` WHERE Email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        $stmt->execute();
        $num = $stmt->rowCount();
        $verrified = array();
        $verrified['authState'] = "Unauthenticated";

        if($num > 0) {
            $result = $stmt->fetch();
            $pass = $result["Password"];
            $hash = password_verify($password, $pass);
            if($hash == true){
                $issuedAt = time();
                $expiresAt =  $issuedAt + 6000;
                $authState = "Authenticated";
                $email = $result["Email"];
                $customerId = $result["CustomerId"];

                $InvoiceQuery = "SELECT InvoiceId FROM `invoice` WHERE CustomerId = :id";
                $stmt = $this->conn->prepare($InvoiceQuery);
                $stmt->bindValue(":id", $customerId, PDO::PARAM_STR);
                $stmt->execute(); 
                $invoiceResult = $stmt->fetch(PDO::FETCH_ASSOC);
                $invoiceId = $invoiceResult['InvoiceId'];              
                $verrified = array('authState' => $authState, 'issuedAt' => $issuedAt, 'expiresAt' => $expiresAt, 'Email' => $email, 'CustomerId' => $customerId, 'InvoiceId' => $invoiceId);
            } 
         } else {
            $verrified['authState']  = "Unauthenticated";
        }
        return $verrified;
    }


    function AdminLogin($data){
        $password = htmlspecialchars($data["Password"]);
        $query = "SELECT * FROM admin";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $num = $stmt->rowCount();
        $verrified = array();
        $verrified['authState'] = "Unauthenticated";

        if($num > 0) {
            $result = $stmt->fetch();
            $pass = $result["Password"];
            $hash = password_verify($password, $pass);
            if($hash == true){
                $issuedAt = time();
                $expiresAt =  $issuedAt + 10000;
                $authState = "Authenticated";
                $accessLevel = "admin";

              
                $verrified = array('authState' => $authState, 'access' => $accessLevel, 'issuedAt' => $issuedAt, 'expiresAt' => $expiresAt);
            } 
         } else {
            $verrified['authState']  = "Unauthenticated";
        }
        return $verrified;
    }

/* 
* Encrypt array function.
* Param: Array.
* returns encrypted base64 string
*/
function auth_encrypt($arr){
    $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
    $iv = openssl_random_pseudo_bytes($ivlen);
    $ciphertext_raw = openssl_encrypt(serialize($arr), $cipher, $this->key, $options=OPENSSL_RAW_DATA, $iv);
    $hmac = hash_hmac('sha256', $ciphertext_raw, $this->key, $as_binary=true);
    $ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );
    return $ciphertext;
    }

/* 
* Decrypt array encrypted array.
*/
    function auth_decrypt($ciphertext){
        $c = base64_decode($ciphertext);
        $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
        $iv = substr($c, 0, $ivlen);
        $hmac = substr($c, $ivlen, $sha2len=32);
        $ciphertext_raw = substr($c, $ivlen+$sha2len);
        $original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, $this->key, $options=OPENSSL_RAW_DATA, $iv);
        $calcmac = hash_hmac('sha256', $ciphertext_raw, $this->key, $as_binary=true);
        if (hash_equals($hmac, $calcmac))//PHP 5.6+ timing attack safe comparison
        {
            return json_encode(unserialize($original_plaintext));
        }
    }
}
?>