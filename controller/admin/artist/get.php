<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// include database and object files
include_once '../../../config/database.php';
include_once '../../../model/admin.php';

// instantiate database and db object
$database = new Database();
$db = $database->getConnection();

// initialize object
$admin = new Admin($db);

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $admin->GetArtist($data);
$num = $stmt->rowCount();

if($num>0){
  
    $artist_arr["artist"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row); 
        $artist_item=array(
            "Name" => $Name,
        );
        array_push($artist_arr["artist"],  $artist_item);
    }
    http_response_code(200);
    echo json_encode($artist_arr["artist"]);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No artist found.")
    );
}
?>