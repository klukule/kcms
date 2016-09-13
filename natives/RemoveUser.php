<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';

if($LoginValid){
  if(!isset($_POST['id'])){
    PrintError(-18);
  }

  $id =  $Connection->EscapeString($_POST['id']);

  $Connection->BeginQuery();
  $Connection->Delete()->From("Users")->Where("id")->Equals()->To($id);
  $Connection->ExecuteQuery();

  $result = $Connection->GetResult();
  if($result == true){
    $json = [
      "status" => "success"
    ];
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
  }else{
    PrintError(-24);
  }
}else{
  PrintError(-17);
}
?>
