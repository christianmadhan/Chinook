<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../Model/artist.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$artist = new Artist($db);
  
// read customers will be here

// query customers
$stmt = $artist->GetAll();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  
    // products array
    $artist_arr["artists"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $artist_item=array(
            "ArtistId" => $ArtistId,
            "Name" => $Name,
        );
  
        array_push($artist_arr["artists"], $artist_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($artist_arr["artists"]);
} else {
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no products found
    echo json_encode(
        array("message" => "No Artists found.")
    );
}
  
// no products found will be here

?>