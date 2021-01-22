<?php


// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/track.php';
include_once '../../model/auth.php';


// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$track = new Track($db);
  
$data = json_decode(file_get_contents('php://input'), true);
$auth = new Auth($db);



$stmt = $track->GetOne($data);
$num = $stmt->rowCount();

if($num>0){
    

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

    http_response_code(200);

    echo json_encode($track_arr["track"]);
} else {
    
    http_response_code(404);
    echo json_encode(
        array("message" => "No Tracks with that Id found")
    );
}
?>