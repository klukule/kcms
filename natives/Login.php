<?php
header('Content-type: application/json');

require_once 'Utils/Errors.php';

require_once 'Utils/MysqliConnection.php';
$Connection = new MysqliConnection();
if(!isset($_POST['username'])){
  PrintError(-10);
}

if(!isset($_POST['password'])){
  PrintError(-11);
}

$username =  $Connection->EscapeString($_POST["username"]);
$password =  $Connection->EscapeString($_POST["password"]);

$Connection->BeginQuery();
$Connection->Select("*")->From("Users")->Where("username")->Equals()->To($username);
$Connection->ExecuteQuery();

$result = $Connection->GetResult();
$output = $Connection->GetOutput();
if($result->num_rows == 1){
  if(md5($password) == $output["password"]){
    date_default_timezone_set("UTC");
    $date = new DateTime();
    $token = md5($output["username"]).md5($output["password"]) .  $date->getTimestamp();
    $json = [
      "status" => "success",
      "token" => $token
    ];
    $time = time() + 3600;
    setcookie("API_TOKEN", $token, $time, "/");
    setcookie("username", $username, $time, "/");
    echo json_encode($json);
  }else{
    PrintError(-13);
  }
}else{
  PrintError(-12);
}
?>
