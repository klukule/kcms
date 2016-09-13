<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';
if($LoginValid){

  if(!isset($_POST['username'])){
    PrintError(-10);
  }

  if(!isset($_POST['display_name'])){
    PrintError(-29);
  }

  $username = $Connection->EscapeString($_POST['username']);
  $display_name = $Connection->EscapeString($_POST['display_name']);

  if($username == ""){
    PrintError(-10);
  }

  if($display_name == ""){
    PrintError(-29);
  }

  $Connection->BeginQuery();
  $Connection->Select("*")->From("Users")->Where("username")->Equals()->To($username);
  $Connection->ExecuteQuery();

  $result = $Connection->GetResult();
  if($result->num_rows == 0){
    $Connection->BeginQuery();
    $Connection->InsertInto("Users")->Values(['username'=>$username,'display_name'=>$display_name,'avatar'=>'images/default_avatar.jpg','password'=>'']);
    $Connection->ExecuteQuery();

    $result = $Connection->GetResult();
    if($result == true){
      $json = [
        "status" => "success"
      ];
      echo json_encode($json, JSON_UNESCAPED_UNICODE);
    }else{
      PrintError(-19);
    }
  }else{
    PrintError(-28);
  }
}else{
  PrintError(-17);
}
?>
