<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and admin file
include_once '../../../config/database.php';
include_once '../../../model/admin.php';

// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize admin with db in constructor
$admin = new Admin($db);

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $admin->GetAlbum($data);
$num = $stmt->rowCount();

if($num>0){
  
    $album_arr["album"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $album_item=array(
            "Title" => $Title,
            "ArtistId" => $ArtistId,
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