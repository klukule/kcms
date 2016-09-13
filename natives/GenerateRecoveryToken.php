<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';
if($LoginValid){

  if(!isset($_POST['id'])){
    PrintError(-18);
  }
  $id = $Connection->EscapeString($_POST['id']);

  $Connection->BeginQuery();
  $Connection->Select("*")->From("Users")->Where('id')->Equals()->To($id);
  $Connection->ExecuteQuery();

  $result = $Connection->GetResult();
  $output = $Connection->GetOutput();

  if($result->num_rows == 1){
    //Generate Password Recovery Cookie
    $PRC_URL =  "http://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
    $PRC_URL = explode("natives",$PRC_URL,2)[0] . "password_recovery.php?username=".$output["username"]."&token=";

    //Login token
    date_default_timezone_set("UTC");
    $date = new DateTime();
    $PRC = md5(md5("PRC") . md5($output["username"]) .md5($output["password"])) .  $date->getTimestamp();

    $json = [
      "status" => "success",
      "prc" => $PRC_URL.$PRC
    ];
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
  }else{
    PrintError(-24);
  }
}else{
  PrintError(-17);
}
?>
