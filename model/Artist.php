<?php
class Artist{
  
    // database connection and table name
    private $conn;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read all tracks
    function GetAll(){
        
        // select all query
        $query = "SELECT * FROM ARTIST";
        
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    // Get a single track
    function GetOne($data) {
        $id = htmlspecialchars($data["ArtistId"]);
            // select all query
        $query = "SELECT * FROM ARTIST WHERE ArtistId = (%s)" % ($id);
                // prepare query statement
        $stmt = $this->conn->prepare($query);
      
        // execute query
        $stmt->execute();
      
        return $stmt;
    }

}

?>