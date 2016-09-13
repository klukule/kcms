<?php
if(!isset($doNotDraw)){
  header('Content-type: application/json');
}

require_once 'Utils/Errors.php';

require_once 'Utils/MysqliConnection.php';
$Connection = new MysqliConnection();

$Print = true;
if(isset($doNotDraw)){
  $Print = false;
}

$PRValid = true;

if(!isset($_POST['username']) && !isset($_GET['username'])){
  if($Print){
    PrintError(-10);
  }else{
    $PRValid = false;
  }
}

if(!isset($_POST['token']) && !isset($_GET['token'])){
  if($Print){
    PrintError(-25);
  }else{
    $PRValid = false;
  }
}
if($PRValid){
  //Escape incoming strings
  $username = $Connection->EscapeString(isset($_POST['username']) ? $_POST['username'] : $_GET['username']);
  $token = $Connection->EscapeString(isset($_POST['token']) ? $_POST['token'] : $_GET['token']);

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

        if($Print){
          $json = [
            "status" => "success",
            "prc" => $token
          ];
          echo json_encode($json, JSON_UNESCAPED_UNICODE);
        }else{
          $PRValid = true;
        }
      }else{
        if($Print){
          PrintError(-17);
        }else{
          $PRValid = false;
        }
      }
    }else{
      if($Print){
        PrintError(-26);
      }else{
        $PRValid = false;
      }
    }
  }else{
    if($Print){
      PrintError(-12);
    }else{
      $PRValid = false;
    }
  }
}
?>
