<?php
session_start();

$_SESSION["imgver_code"] = $result["randtox"] = rand(68,184);
$json = json_encode($result);
echo $json;
exit;
?>