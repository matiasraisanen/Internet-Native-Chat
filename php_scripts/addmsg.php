<?php

include 'cfg.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);
$connection->set_charset("utf8");
if ($connection->connect_error)
{
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$date = date("d.m.Y");
$time = date("H:i");
$ip=$_SERVER['REMOTE_ADDR'];

$query = "INSERT INTO messages(nick, date, time, message, channel) values('$json[nick]', '$date', '$time', '$json[message]', '$json[channel]')";

$query_result = $connection->query($query);

if ($query_result === true)
{
 $message = 'Success!';
}

else
{
 $message = 'Error! Try Again.';
}

echo json_encode($message);

$connection->close();
