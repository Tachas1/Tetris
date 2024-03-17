<?php

$player_name = $_POST["player_name"];
$player_score = $_POST["player_score"];

echo $player_score;

$valueName = htmlspecialchars($player_name);

$host = '127.0.0.1';
$db = 'highscores';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$pdo = new PDO($dsn, $user, $pass);

$query = "CREATE TABLE IF NOT EXISTS score(
    player_id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(10) NOT NULL,
    player_score INT NOT NULL)";

$pdo->query($query);

$query = "INSERT INTO score (player_name, player_score) values (:valueName, :valueScore)";

$stmt = $pdo->prepare($query);
$stmt->execute(['valueName' => $valueName,'valueScore' => $player_score]);