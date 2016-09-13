<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';
if($LoginValid){
  $Connection->BeginQuery();
  $Connection->Select("*")->From("Users")->OrderBy("display_name","ASC");
  $Connection->ExecuteQuery();

  $result = $Connection->GetResult();
  if($result->num_rows > 0){
    $users = [];
    for ($i=0; $i < $result->num_rows; $i++) {
      $output = $Connection->GetOutput();

      $user = [
        'id' => $output["id"],
        'username' => $output["username"],
        'display_name' => $output["display_name"],
        'avatar' => $output["avatar"]
      ];
      array_push($users,$user);
    }
    $json = [
      "status" => "success",
      "users" => $users
    ];
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
  }else{
    PrintError(-23);
  }
}else{
  PrintError(-17);
}
?>
