<?php
class Database{
  
    // Database credential. Connection string to aws instance.
    private $host = "chinookabrided.corx0pahan9c.us-east-1.rds.amazonaws.com";
    private $db_name = "chinook_abridged";
    private $username = "root";
    private $password = "tywMKPZKWzZwc8nR9rLh";
    public  $conn;
  
    // Wraps the connection in a try catch. and returns the connection to be used.
    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>