<?php

$connect = mysqli_connect("localhost", "root", "", "highscores");

$result = mysqli_query($connect, "SELECT * FROM score ORDER BY player_score DESC LIMIT 9");

$data = array();

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);