<?php
/** 
 * 
 * @api {post} /controller/artist/get-all-artist get all artists
 * @apiName GetAllArtist
 * @apiGroup Artist
 * @apiVersion 0.0.0
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Access-Control-Allow-Origin": "*"
 *   "Content-Type": "application/json; charset=UTF-8"
 * 
 * }
 * @apiSuccess {json} artust A list of artist
 * @apiParam {auth} auth a valid auth token is required.
 * 
 * @apiSuccessExample Example data on success:
 *  [   
 *   {
 *       ArtistId: "3",
 *       Name: "Aerosmith"
 *   },
 *  ]
 * 
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 * 
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/artist.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$artist = new Artist($db);
  
$stmt = $artist->GetAll();
$num = $stmt->rowCount();

if($num>0){
  
    $artist_arr["artists"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $artist_item=array(
            "ArtistId" => $ArtistId,
            "Name" => $Name,
        );
  
        array_push($artist_arr["artists"], $artist_item);
    }

    http_response_code(200);

    echo json_encode($artist_arr["artists"]);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No Artists found.")
    );
}
?>