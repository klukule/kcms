<?php

header('Content-type: application/json');

require_once 'Utils/Errors.php';

require_once 'Utils/MysqliConnection.php';
$Connection = new MysqliConnection();

if(!isset($_POST['username'])){
  PrintError(-10);
}

if(!isset($_POST['token'])){
  PrintError(-25);
}

if(!isset($_POST['password'])){
  PrintError(-11);
}

//Escape incoming strings
$username = $Connection->EscapeString($_POST['username']);
$token = $Connection->EscapeString($_POST['token']);
$newPassword = $Connection->EscapeString($_POST['password']);

//Create and execute query
$Connection->BeginQuery();
$Connection->Select("*")->From("Users")->Where('username')->Equals()->To($username);
$Connection->ExecuteQuery();

//Split incoming token
$tokenMD5 = substr($token,0,32);
$tokenCreateTime = substr($token,32,strlen($token) - 32);

//Get query output
$result = $Connection->GetResult();
$output = $Connection->GetOutput();

if($result->num_rows == 1){
  //Try to reconstruct token with data from DB
  $tokenFromDB = md5(md5("PRC") . md5($output["username"]) .md5($output["password"]));
  if($tokenFromDB == $tokenMD5){
    date_default_timezone_set("UTC");
    $date = new DateTime();
    $timeWLT = $date->getTimestamp() - 3600;
    if(intval($tokenCreateTime) >= $timeWLT){
      //Create and execute query
      $Connection->BeginQuery();
      $Connection->Update("Users")->Set(['password'=>md5($newPassword)])->Where("username")->Equals()->To($output["username"]);
      $Connection->ExecuteQuery();
      $result2 = $Connection->GetResult();
      if($result2 == true){
        if(isset($_COOKIE['API_TOKEN'])){
          $tokenUsername = substr($_COOKIE['API_TOKEN'],0,32);
          //If user on which we are trying to change password, is currently logged in, than log him out :D
          if($tokenUsername == md5($output["username"])){
            unset($_COOKIE['API_TOKEN']);
            unset($_COOKIE['username']);
            setcookie('API_TOKEN', null, -1, '/');
            setcookie('username', null, -1, '/');
          }
        }
        $json = [
          "status" => "success"
        ];
        echo json_encode($json, JSON_UNESCAPED_UNICODE);
      }else{
        PrintError(-19);
      }
    }else{
      PrintError(-17);
    }
  }else{
    PrintError(-27);
  }
}else{
  PrintError(-12);
}
?>
