<?php
class Album{
  
    // database connection and table name
    private $conn;
  
    // object properties
    public $AlbumId;
    public $Title;
    public $ArtistId;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
    function GetAll(){
        // select all query
        $query = "SELECT album.Title, artist.Name, album.AlbumId FROM album INNER JOIN artist ON album.ArtistId=artist.ArtistId";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    function GetAlbum($data) {
        $id = htmlspecialchars($data["AlbumId"]);
        // select query.
        $query = "SELECT a.TrackId, a.Name, a.Composer, a.Milliseconds, a.Bytes, a.UnitPrice, c.Name AS GenreName, d.Name AS MediaName FROM track a JOIN album b ON a.AlbumId = b.AlbumId JOIN genre c ON a.GenreId = c.GenreId JOIN mediatype d ON a.MediaTypeId = d.MediaTypeId WHERE b.AlbumId = :albumid";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':albumid', $id); 
        // execute query
        $stmt->execute();
        return $stmt;
    }

}
?>