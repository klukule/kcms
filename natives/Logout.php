<?php
header('Content-type: application/json');

unset($_COOKIE['API_TOKEN']);
unset($_COOKIE['username']);
setcookie('API_TOKEN', null, -1, '/');
setcookie('username', null, -1, '/');

echo json_encode(["status" => "success"]);
?>
