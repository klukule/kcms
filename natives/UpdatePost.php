<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';

if($LoginValid){
  if(!isset($_POST['id'])){
    PrintError(-18);
  }

  if(!isset($_POST['title'])){
    PrintError(-21);
  }

  if(!isset($_POST['text'])){
    PrintError(-22);
  }

  if(!isset($_POST['uid'])){
    PrintError(-20);
  }

  $id =  $Connection->EscapeString($_POST['id']);
  $title =  $Connection->EscapeString($_POST['title']);
  $text =  $Connection->EscapeString($_POST['text']);
  $uid =  $Connection->EscapeString($_POST['uid']);

  $Connection->BeginQuery();
  $Connection->Update("Articles")->Set(['title'=>$title,'text'=>$text,'uid'=>$uid])->Where("id")->Equals()->To($id);
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
  PrintError(-17);
}
?>
