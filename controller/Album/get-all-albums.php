<?php 
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../config/database.php';
include_once '../../model/album.php';

/** 
 * 
 * @api {post} /get-all-albums gets all albums
 * @apiName GetAllAlbums
 * @apiGroup Album
 * @apiVersion 0.0.0
 * 
 * @apiSuccess {String} AlbumId The Id of the Album
 * @apiSuccess {String} Title The title of the Album
 * @apiSuccess {String} Name The name of the Album
 * @apiParam {auth} a valid auth token is required.
 * 
 * @apiSuccessExample Example data on success:
 * [{
 *   AlbumId: "5",
 *   Title: "Big Ones",
 *   Name: "Aerosmith"
 * },
 * {
 *  "AlbumId": "6",
 *      "Title": "Jagged Little Pill",
 *      "Name": "Alanis Morissette"
 * }]
 * 
 * @apiError AuthEmptyError the auth token was empty/or not included. Minimum of <code>auth: "example"</code> is required in post body.
 */



// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$album = new Album($db);
  
$data = json_decode(file_get_contents('php://input'), true);

$stmt = $album->GetAll();
$num = $stmt->rowCount();

if($num>0){

    $album_arr["album"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $album_item=array(
            "AlbumId" => $AlbumId,
            "Title" => $Title,
            "Name" => $Name,
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