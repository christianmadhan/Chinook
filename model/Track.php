<?php
class Track{
  
    // database connection and table name
    private $conn;
    private $table_name = "track";
  
    // object properties
    public $TrackId;
    public $Name;
    public $AlbumId;
    public $MediaTypeId;
    public $GenreId;
    public $Composer;
    public $Milliseconds;
    public $Bytes;
    public $UnitPrice;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read all tracks
    function GetAll(){
        
        // select all query
        $query = "SELECT * FROM TRACK";
        
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    // Get a single track
    function GetOne($data) {
        $id = htmlspecialchars($data["TrackId"]);
            // select all query
        $query = "SELECT * FROM TRACK WHERE TrackId = :id";;
                // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
      
        // execute query
        $stmt->execute();
      
        return $stmt;
    }

}

?>