<?php 
/** 
 * 
 * @api {post} /controller/album/get-album get one album
 * @apiName GetOneAlbum
 * @apiGroup Album
 * @apiVersion 0.0.0
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Access-Control-Allow-Origin": "*"
 *   "Content-Type": "application/json; charset=UTF-8"
 * 
 * }
 * @apiSuccess {String} albums A list of albums
 * @apiParam {auth} a valid auth token is required.
 * @apiParam {AlbumId} a Id of an existing album is required.
 * 
 * 
 * @apiSuccessExample Example data on success:
 * [{
 *   AlbumId: "5",
 *   Title: "Big Ones",
 *   Name: "Aerosmith"
 * }]
 * 
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 * @apiError InvalidAlbumId the album with <code>"AlbumId": "id" </code> was not found. make sure the album id exist. 
 * 
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/album.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$album = new Album($db);
  
$data = json_decode(file_get_contents('php://input'), true);

$stmt = $album->GetAlbum($data);
$num = $stmt->rowCount();

if($num>0){

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
    echo json_encode($album_arr["album"]);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No albums found.")
    );
}

?>