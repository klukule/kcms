<?php
if(isset($_COOKIE['API_TOKEN']) && isset($_COOKIE['username'])){
  $tokenUsername = substr($_COOKIE['API_TOKEN'],0,32);
  $tokenPassword = substr($_COOKIE['API_TOKEN'],32,32);
  date_default_timezone_set("UTC");
  $date = new DateTime();
  $newToken = $tokenUsername . $tokenPassword .  $date->getTimestamp();
  $time = time() + 3600;
  setcookie("API_TOKEN", $newToken, $time, "/");
  setcookie("username", $_COOKIE['username'], $time, "/");
}
echo json_encode("",JSON_UNESCAPED_UNICODE);
?>
