<?php
header('Content-type: application/json');
$doNotDraw = true;
include_once 'LoginValid.php';
if($LoginValid){
  $Connection->BeginQuery();
  $Connection->Select("*")->From("Articles")->OrderBy("date","DESC");
  $Connection->ExecuteQuery();

  $result = $Connection->GetResult();
  $posts = [];
  for ($i=0; $i < $result->num_rows; $i++) {
    $output = $Connection->GetOutput();

    $post = [
      'id' => $output["id"],
        'uid' => $output["uid"],
        'title' => $output["title"],
        'text' => $output["text"],
        'date' => $output["date"],
    ];
    array_push($posts,$post);
  }
    $json = [
      "status" => "success",
      "posts" => $posts
    ];
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
}else{
  PrintError(-17);
}
 ?>
