<?php

$host = "localhost";
$db_name = "chinook_abridged";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname". $db_name, $username, $password);
    $conn->exec("set names utf8");
    
    $Id = 94;
    $query = "SELECT * from track";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);       
    echo json_encode($result);
} catch (\Throwable $th) {
    //throw $th;
}

?>