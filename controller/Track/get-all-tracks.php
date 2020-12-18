<?php

/** 
 * @api {post} /controller/track/get-all-tracks.php Get all tracks
 * @apiName GetAllTracks
 * @apiGroup Track
 * @apiVersion 0.0.0
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Access-Control-Allow-Origin": "*"
 *   "Content-Type": "application/json; charset=UTF-8"
 * 
 * }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
* [
*    {
*        "TrackId": "23",
*        "Name": "Walk On Water",
*        "AlbumId": "5",
*        "MediaTypeId": "1",
*        "GenreId": "1",
*        "Composer": "Steven Tyler, Joe Perry, Jack Blades, Tommy Shaw",
*        "Milliseconds": "295680",
*        "Bytes": "9719579",
*        "UnitPrice": "0.99"
*    }
*  ]
* 
*/
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/track.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$track = new Track($db);
  
$data = json_decode(file_get_contents('php://input'), true);

$stmt = $track->GetAll();
$num = $stmt->rowCount();

if($num>0){

    $track_arr["track"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
  
        $track_item=array(
            "TrackId" => $TrackId,
            "Name" => $Name,
            "AlbumId" => $AlbumId,
            "MediaTypeId" => $MediaTypeId,
            "GenreId" => $GenreId,
            "Composer" => $Composer,
            "Milliseconds" => $Milliseconds,
            "Bytes" => $Bytes,
            "UnitPrice" => $UnitPrice,
        );
  
        array_push($track_arr["track"],  $track_item);
    }

    http_response_code(200);
  
    echo json_encode($track_arr["track"]);
} else {

    http_response_code(404);

    echo json_encode(
        array("message" => "No Tracks found.")
    );
}

?>