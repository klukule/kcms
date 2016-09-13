
<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';

if($LoginValid){
  if(!isset($_POST["uid"])){
    PrintError(-20);
  }

  if(!isset($_POST["display_name"])){
    PrintError(-29);
  }

  if(!isset($_FILES["avatar"]) && !isset($_POST["avatar"]) ){
    PrintError(-22);
  }

  $updateAvatarInDB = true;
  if(isset($_POST["avatar"]) && $_POST["avatar"] == "dnu"){
    $updateAvatarInDB = false;
  }

  $username = $Connection->EscapeString($_COOKIE["username"]);
  $targetFilename = "";
  if(isset($_FILES["avatar"])){
    $avatar = $_FILES["avatar"];
    $targetFilename = "../storage/avatars/" . basename($avatar["name"]);
    $imageFileType = pathinfo($targetFilename,PATHINFO_EXTENSION);
    $targetFilename = "../storage/avatars/" . $username . "." . $imageFileType;

    if ($avatar["size"] > 500000) {
      PrintError(-32);
    }
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
      PrintError(-33);
    }
    if (move_uploaded_file($avatar["tmp_name"], $targetFilename)) {
        //echo "The file ". basename( $_FILES["upload"]["name"]). " has been uploaded.";
    } else {
        PrintError(-34);
    }
  }


  $uid =  $Connection->EscapeString($_POST["uid"]);
  $display_name =  $Connection->EscapeString($_POST["display_name"]);

  $Connection->BeginQuery();

  if($updateAvatarInDB){ //Can occure when we don't change avatar (and we don't want change avatar in DB if user hasn't selected, because he can have default one)
    $Connection->Update("Users")->Set(['avatar'=>substr($targetFilename,3),'display_name'=>$display_name])->Where("id")->Equals()->To($uid);
  }else{
    $Connection->Update("Users")->Set(['display_name'=>$display_name])->Where("id")->Equals()->To($uid);
  }

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
