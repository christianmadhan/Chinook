<?php
class Admin{
  
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    /* CRUD: TRACK */
    function DeleteTrack($data) {
        $id = htmlspecialchars($data['trackId']); 
        $query  = $this->conn->prepare("DELETE FROM `invoiceline` WHERE TrackId = :id; DELETE FROM `track` WHERE TrackId = :id; ");
        $query->bindParam(':id', $id);
        if ($query->execute()) {
            return true;
          } else{
            return false;
          }
    }

    function UpdateTrack($data) {
        $id = htmlspecialchars($data['TrackId']);
        $Name = htmlspecialchars($data['Name']);                                                  
        $AlbumId = htmlspecialchars($data['AlbumId']);                                                  
        $MediaTypeId = htmlspecialchars($data['MediaTypeId']);                                                  
        $GenreId = htmlspecialchars($data['GenreId']);
        $Composer = htmlspecialchars($data['Composer']);                                                  
        $Milliseconds = htmlspecialchars($data['Milliseconds']);                                                  
        $Bytes = htmlspecialchars($data['Bytes']);   
        $UnitPrice = htmlspecialchars($data['UnitPrice']);

        $query  = $this->conn->prepare("UPDATE `track` SET `Name`= :name,`AlbumId`= :albumid, `MediaTypeId`= :mediatypeid,`GenreId`= :genreid,`Composer`= :composer, `Milliseconds`= :milliseconds, `Bytes`= :bytes, `UnitPrice`= :unitprice WHERE TrackId = :id");
        $query->bindParam(':id', $id);
        $query->bindParam(':name', $Name);
        $query->bindParam(':albumid', $AlbumId);
        $query->bindParam(':mediatypeid', $MediaTypeId);
        $query->bindParam(':genreid', $GenreId);
        $query->bindParam(':composer', $Composer);
        $query->bindParam(':milliseconds', $Milliseconds);
        $query->bindParam(':bytes', $Bytes);
        $query->bindParam(':unitprice', $UnitPrice);

        if ($query->execute()) {
            return true;
          } else{
            return false;
          }
    }


    /* CRUD: Album */

    function DeleteAlbum($data) {
        $id = htmlspecialchars($data['AlbumId']);                                                  
        $query  = $this->conn->prepare("DELETE A from invoiceline A INNER JOIN track B ON A.TrackId = B.TrackId WHERE B.AlbumId = :id; DELETE C FROM track C INNER JOIN album D ON C.AlbumId = D.AlbumId WHERE D.AlbumId = :id; DELETE FROM album WHERE album.AlbumId = :id; ");
        $query->bindParam(':id', $id);
        if ($query->execute()) {
            return true;
          } else{
            return false;
          }
    }

    /* CRUD: Artist */
    function DeleteArtist($data) {
        $id = htmlspecialchars($data['ArtistId']);                                                  
        $query  = $this->conn->prepare("DELETE A from invoiceline A INNER JOIN track B ON A.TrackId = B.TrackId INNER JOIN album C ON B.AlbumId = C.AlbumId INNER JOIN artist D ON C.ArtistId = D.ArtistId WHERE D.ArtistId = :id; DELETE E FROM track E INNER JOIN album F ON E.AlbumId = F.AlbumId INNER JOIN artist G ON F.ArtistId = G.ArtistId WHERE G.ArtistId = :id; DELETE FROM album WHERE album.ArtistId = :id; DELETE FROM artist WHERE artist.ArtistId = :id;");
        $query->bindParam(':id', $id);
        if ($query->execute()) {
            return true;
          } else{
            return false;
          }
    }


}
?>