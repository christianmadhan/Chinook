<?php 
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../Model/album.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$album = new Album($db);
  
$data = json_decode(file_get_contents('php://input'), true);

// // query customers
$stmt = $album->GetAlbum($data);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  
    // products array
    $album_arr["album"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $album_item=array(
            "TrackId" => $TrackId,
            "Name" => $Name,
            "Composer" => $Composer,
            "Milliseconds" => $Milliseconds,
            "Bytes" => $Bytes,
            "UnitPrice" => $UnitPrice,
            "GenreName" => $GenreName,
            "MediaName" => $MediaName,
        );
  
        array_push($album_arr["album"],  $album_item);
    }
    http_response_code(200);
    // show products data in json format
    echo json_encode($album_arr["album"]);
} else {
    // set response code - 404 Not found
    http_response_code(404);
    // tell the user no products found
    echo json_encode(
        array("message" => "No albums found.")
    );
}

?>