<?php
class Artist{
  
    // database connection and table name
    private $conn;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function GetAll(){
        
        // select all query
        $query = "SELECT * FROM `artist`";
        
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    // Get a single artist
    function GetOne($data) {
        $id = htmlspecialchars($data["ArtistId"]);
            // select all query
        $query = "SELECT * FROM `artist` WHERE artist.ArtistId = :id";
                // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
      
        // execute query
        $stmt->execute();
      
        return $stmt;
    }

}

?>