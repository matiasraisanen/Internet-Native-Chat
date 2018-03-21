<?php
header("Content-Type: application/json; charset=UTF-8");
include 'cfg.php';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error)
{
 die("Connection failed: " . $connection->connect_error);
}

//$query = "SELECT * FROM messages";
$query = "SELECT id, time, date, nick, message, channel FROM messages";

$connection->set_charset("utf8");
$result = mysqli_query($connection,$query);
$output = array('messages' => array());
while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
  $output['messages'][] = $row;

}
echo json_encode($output);

$connection->close();

?>
