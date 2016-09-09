<?php
function PrintError($errCode){
  $errors = [
    -10 => [
      "status" => "error",
      "message" => "No username entered",
      "code" => -10
    ],
    -11 => [
      "status" => "error",
      "message" => "No password entered",
      "code" => -11
    ],
    -12 => [
      "status" => "error",
      "message" => "Username not found",
      "code" => -12
    ],
    -13 => [
      "status" => "error",
      "message" => "Incorrect password",
      "code" => -13
    ],
    -14 => [
      "status" => "error",
      "message" => "API_TOKEN cookie not set",
      "code" => -14
    ],
    -15 => [
      "status" => "error",
      "message" => "Username cookie not set",
      "code" => -15
    ],
    -16 => [
      "status" => "error",
      "message" => "Token expired",
      "code" => -16
    ],
    -17 => [
      "status" => "error",
      "message" => "Invalid cookies",
      "code" => -17
    ],
    -18 => [
      "status" => "error",
      "message" => "No ID entered",
      "code" => -18
    ],
    -19 => [
      "status" => "error",
      "message" => "Post with this ID not found",
      "code" => -19
    ],
    -20 => [
      "status" => "error",
      "message" => "No UID entered",
      "code" => -20
    ],
    -21 => [
      "status" => "error",
      "message" => "No Title entered",
      "code" => -21
    ],
    -22 => [
      "status" => "error",
      "message" => "No Text entered",
      "code" => -22
    ],
  ];

  echo json_encode($errors[$errCode]);
  exit($errCode);
}
?>
