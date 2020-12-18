<?php

/** 
 * @api {post} /controller/track/get-track.php Get one track
 * @apiName GetOneTrack
 * @apiGroup Track
 * @apiVersion 0.0.0
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Access-Control-Allow-Origin": "*"
 *   "Content-Type": "application/json; charset=UTF-8"
 * 
 * }
 * @apiParam {json} auth a valid auth token is required.
 * 
 *  * @apiParamExample {json} Request-Example:
* {
*    "TrackId": 123
* }
 * 
 * @apiSuccess {json} response success response
 * @apiSuccessExample Example data on success: 
* [
*    {
*        "Name": "Quadrant",
*        "AlbumId": "13",
*        "MediaTypeId": "1",
*        "GenreId": "2",
*        "Composer": "Billy Cobham",
*        "Milliseconds": "261851",
*        "Bytes": "8538199",
*        "UnitPrice": "0.99"
*    }
* ]
 * @apiError TrackDoesNotExitError the trackid provided does not exit or is missing from post body.
 * 
 */

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