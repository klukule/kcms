<?php
if(!isset($doNotDraw)){
  header('Content-type: application/json');
}

require_once 'Utils/Errors.php';

require_once 'Utils/MysqliConnection.php';
$Connection = new MysqliConnection();

$LoginValid = true;

$Print = true;
if(isset($doNotDraw)){
  $Print = false;
}

if(!isset($_COOKIE['API_TOKEN'])){
  if($Print){
    PrintError(-14);
  }else{
    $LoginValid = false;
  }
}

if(!isset($_COOKIE['username'])){
  if($Print){
    PrintError(-15);
  }else{
    $LoginValid = false;
  }
}



if($LoginValid){
  $usernameCookie = $_COOKIE['username'];
  $tokenCookie = $_COOKIE['API_TOKEN'];

  $tokenUsername = substr($tokenCookie,0,32);
  $tokenPassword = substr($tokenCookie,32,32);
  $tokenCreateTime = substr($tokenCookie,64,strlen($tokenCookie) - 64);


  date_default_timezone_set("UTC");
  $date = new DateTime();
  $timeWLT = $date->getTimestamp() - 3600000;
  if($tokenCreateTime >= $timeWLT){
    if(md5($usernameCookie) == $tokenUsername){
      $json = [
        "status" => "success",
        "token" => $tokenCookie
      ];
      if($Print){
        echo json_encode($json);
      }else{
        $LoginValid = true;
      }
    }
    else{
      unset($_COOKIE['API_TOKEN']);
      unset($_COOKIE['username']);
      setcookie('API_TOKEN', null, -1, '/');
      setcookie('username', null, -1, '/');
      if($Print){
        PrintError(-17);
      }else {
        $LoginValid = false;
      }
    }
  }else{
    unset($_COOKIE['API_TOKEN']);
    unset($_COOKIE['username']);
    setcookie('API_TOKEN', null, -1, '/');
    setcookie('username', null, -1, '/');
    if($Print){
      PrintError(-16);
    }else {
      $LoginValid = false;
    }
  }
}
?>
