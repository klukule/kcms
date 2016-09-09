<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';
if($LoginValid){
  /*  if(!isset($_POST['username'])){
  PrintError(-10);
}*/
$userId = false;
$user = "";

if(isset($_POST['username'])){
  $user = $_POST['username'];
}

if(isset($_POST['id'])){
  $userId = true;
  $user = $_POST['id'];
}

$username =  $Connection->EscapeString($user);

$Connection->BeginQuery();
if($userId){
  $Connection->Select("*")->From("Users")->Where("id")->Equals()->To($username);
}else{
  $Connection->Select("*")->From("Users")->Where("username")->Equals()->To($username);
}
$Connection->ExecuteQuery();

$result = $Connection->GetResult();
$output = $Connection->GetOutput();
if($result->num_rows == 1){
  $json = [
    "status" => "success",
    "id" => $output["id"],
    "username" => $output["username"],
    "display_name" => $output["display_name"],
    "avatar" => $output["avatar"]
  ];
  echo json_encode($json, JSON_UNESCAPED_UNICODE);
}else{
  PrintError(-12);
}
}else{
  PrintError(-17);
}
?>
