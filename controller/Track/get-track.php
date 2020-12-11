<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../Model/track.php';
include_once '../../Model/auth.php';


// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$track = new Track($db);
  
$data = json_decode(file_get_contents('php://input'), true);
$auth = new Auth($db);



$stmt = $track->GetOne($data);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
    
    // products array
    $track_arr["track"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
    
        $track_item=array(
            "Name" => $Name,
            "AlbumId" => $AlbumId,
            "MediaTypeId" => $MediaTypeId,
            "GenreId" => $GenreId,
            "Composer" => $Composer,
            "Milliseconds" => $Milliseconds,
            "Bytes" => $Bytes,
            "UnitPrice" => $UnitPrice
        );
    
        array_push($track_arr["track"], $track_item);
    }
    
    // set response code - 200 OK
    http_response_code(200);
    
    // show products data in json format
    echo json_encode($track_arr["track"]);
} else {
    
    http_response_code(404);
    echo json_encode(
        array("message" => "No Tracks with that Id found")
    );
}
// no products found will be here

?>