<?php
$doNotDraw = true;
include_once 'natives/LoginValid.php';
if($LoginValid){
  header("Location: index.php");
  exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>

  <title>KCMS | Login</title>

  <link rel="stylesheet" href="vendor/fontawesome/css/font-awesome.css"/>
  <link rel="stylesheet" href="vendor/animate.css/animate.css"/>
  <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.css"/>
  <link rel="stylesheet" href="vendor/toastr/toastr.min.css"/>

  <link rel="stylesheet" href="styles/pe-icons/pe-icon-7-stroke.css"/>
  <link rel="stylesheet" href="styles/pe-icons/helper.css"/>
  <link rel="stylesheet" href="styles/stroke-icons/style.css"/>
  <link rel="stylesheet" href="styles/style.css">
</head>
<body class="blank">

  <div class="wrapper">


    <section class="content">
      <div class="container-center animated slideInDown">
        <div class="view-header">
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-unlock"></i>
          </div>
          <div class="header-title">
            <h3>Login</h3>
            <small>
              Please enter password.
            </small>
          </div>
        </div>

        <div class="panel panel-filled">
          <div class="panel-body">
            <form action="#" id="loginForm" novalidate="">
              <div class="form-group">
                <label class="control-label" for="username">Username</label>
                <input type="text" placeholder="Username" title="Please enter you username" required="" value="" name="username" id="username" class="form-control">
                <span class="help-block small">Your username to CMS</span>
              </div>
              <div class="form-group">
                <label class="control-label" for="password">Password</label>
                <input type="password" title="Please enter your password" placeholder="******" required="" value="" name="password" id="password" class="form-control">
                <span class="help-block small">Your password</span>
              </div>
              <div>
                <button class="btn btn-accent">Login</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>

  </div>

  <script src="vendor/pacejs/pace.min.js"></script>
  <script src="vendor/jquery/dist/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
  <script src="vendor/toastr/toastr.min.js"></script>
  <script src="vendor/sparkline/index.js"></script>
  <script src="vendor/flot/jquery.flot.min.js"></script>
  <script src="vendor/flot/jquery.flot.resize.min.js"></script>
  <script src="vendor/flot/jquery.flot.spline.js"></script>

  <script src="scripts/Utils/Cookies.js"></script>

  <script src="scripts/KCMS.js"></script>

  <script type="text/javascript">
  $( "#loginForm" ).submit(function( event ) {
    API.ExecuteNativeCommand("Login","POST",{"username":$("#username").val(),"password":$("#password").val()},"",function(data){
      if(data.status == "error"){
        API.ShowError("Error",data.message);
      }else if(data.status == "success"){
        window.location.href = "index.php";
      }
    });
    event.preventDefault();
  });
  </script>
</body>
</html>
