<?php
$doNotDraw = true;
include_once 'natives/LoginValid.php';
if(!$LoginValid){
  header("Location: login.php");
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

  <title>KCMS | Dashboard</title>
  <link rel="stylesheet" href="vendor/fontawesome/css/font-awesome.css"/>
  <link rel="stylesheet" href="vendor/animate.css/animate.css"/>
  <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.css"/>
  <link rel="stylesheet" href="vendor/toastr/toastr.min.css"/>

  <link rel="stylesheet" href="styles/pe-icons/pe-icon-7-stroke.css"/>
  <link rel="stylesheet" href="styles/pe-icons/helper.css"/>
  <link rel="stylesheet" href="styles/stroke-icons/style.css"/>
  <link rel="stylesheet" href="styles/style.css">
</head>
<body>

  <div class="wrapper">

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <div id="mobile-menu">
            <div class="left-nav-toggle">
              <a href="#">
                <i class="stroke-hamburgermenu"></i>
              </a>
            </div>
          </div>
          <a class="navbar-brand" href="index.php">
            KCMS
            <span>v.1.0</span>
          </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <div class="left-nav-toggle">
            <a href="#">
              <i class="stroke-hamburgermenu"></i>
            </a>
          </div>

          <ul class="nav navbar-nav navbar-right">
            <li class=" profil-link">
              <a href="#" id="logoutButton">
                <span class="profile-address" id="userDisplayName"></span>
                <img src="" class="img-circle" alt="" id="userAvatar">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <aside class="navigation">
      <nav>
        <ul class="nav kcms-nav" id="SideNav">

        </ul>
      </nav>
    </aside>


    <section class="content">
      <div class="container-fluid" id="container">

      </div>
    </section>

  </div>

  <script src="vendor/pacejs/pace.min.js"></script>
  <script src="vendor/jquery/dist/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
  <script src="http://mindmup.github.io/bootstrap-wysiwyg/external/jquery.hotkeys.js" charset="utf-8"></script>
  <script src="vendor/bootstrap-wysiwyg/js/bootstrap-wysiwyg.js"></script>
  <script src="vendor/toastr/toastr.min.js"></script>
  <script src="vendor/sparkline/index.js"></script>
  <script src="vendor/flot/jquery.flot.min.js"></script>
  <script src="vendor/flot/jquery.flot.resize.min.js"></script>
  <script src="vendor/flot/jquery.flot.spline.js"></script>

  <script src="scripts/Utils/Cookies.js"></script>

  <script src="scripts/KCMS.js"></script>

  <script type="text/javascript">
  $(document).ready(function () {
    API.GetCurentUserInfo(function(data){
      if(data.status == "success"){
        $("#userDisplayName").html(data.display_name);
        $("#userAvatar").attr("src",data.avatar);
      }
    });

    $( "#logoutButton" ).click(function( event ) {
      event.preventDefault();
      API.ExecuteNativeCommand("Logout", "GET","","",function(data){
          document.location.href = 'index.php';
      });
    });
  });
  </script>
  <!-- <script>
  $(document).ready(function () {


  // Sparkline charts
  var sparklineCharts = function () {
  $(".sparkline").sparkline([20, 34, 43, 43, 35, 44, 32, 44, 52, 45], {
  type: 'line',
  lineColor: '#FFFFFF',
  lineWidth: 3,
  fillColor: '#404652',
  height: 47,
  width: '100%'
});

$(".sparkline7").sparkline([10, 34, 13, 33, 35, 24, 32, 24, 52, 35], {
type: 'line',
lineColor: '#FFFFFF',
lineWidth: 3,
fillColor: '#f7af3e',
height: 75,
width: '100%'
});

$(".sparkline1").sparkline([0, 6, 8, 3, 2, 4, 3, 4, 9, 5, 3, 4, 4, 5, 1, 6, 7, 15, 6, 4, 0], {
type: 'line',
lineColor: '#2978BB',
lineWidth: 3,
fillColor: '#2978BB',
height: 170,
width: '100%'
});

$(".sparkline3").sparkline([-8, 2, 4, 3, 5, 4, 3, 5, 5, 6, 3, 9, 7, 3, 5, 6, 9, 5, 6, 7, 2, 3, 9, 6, 6, 7, 8, 10, 15, 16, 17, 15], {

type: 'line',
lineColor: '#fff',
lineWidth: 3,
fillColor: '#393D47',
height: 70,
width: '100%'
});

$(".sparkline5").sparkline([0, 6, 8, 3, 2, 4, 3, 4, 9, 5, 3, 4, 4, 5], {
type: 'line',
lineColor: '#f7af3e',
lineWidth: 2,
fillColor: '#2F323B',
height: 20,
width: '100%'
});
$(".sparkline6").sparkline([0, 1, 4, 2, 2, 4, 1, 4, 3, 2, 3, 4, 4, 2, 4, 2, 1, 3], {
type: 'bar',
barColor: '#f7af3e',
height: 20,
width: '100%'
});

$(".sparkline8").sparkline([4, 2], {
type: 'pie',
sliceColors: ['#f7af3e', '#404652']
});
$(".sparkline9").sparkline([3, 2], {
type: 'pie',
sliceColors: ['#f7af3e', '#404652']
});
$(".sparkline10").sparkline([4, 1], {
type: 'pie',
sliceColors: ['#f7af3e', '#404652']
});
$(".sparkline11").sparkline([1, 3], {
type: 'pie',
sliceColors: ['#f7af3e', '#404652']
});
$(".sparkline12").sparkline([3, 5], {
type: 'pie',
sliceColors: ['#f7af3e', '#404652']
});
$(".sparkline13").sparkline([6, 2], {
type: 'pie',
sliceColors: ['#f7af3e', '#404652']
});
};

var sparkResize;

// Resize sparkline charts on window resize
$(window).resize(function () {
clearTimeout(sparkResize);
sparkResize = setTimeout(sparklineCharts, 100);
});

// Run sparkline
sparklineCharts();


// Flot charts data and options
var data1 = [ [0, 16], [1, 24], [2, 11], [3, 7], [4, 10], [5, 15], [6, 24], [7, 30] ];
var data2 = [ [0, 26], [1, 44], [2, 31], [3, 27], [4, 36], [5, 46], [6, 56], [7, 66] ];

var chartUsersOptions = {
series: {
splines: {
show: true,
tension: 0.4,
lineWidth: 1,
fill: 1

}

},
grid: {
tickColor: "#404652",
borderWidth: 0,
borderColor: '#404652',
color: '#404652'
},
colors: [ "#f7af3e","#DE9536"]
};

$.plot($("#flot-line-chart"), [data2, data1], chartUsersOptions);


// Run toastr notification with Welcome message
setTimeout(function(){
toastr.options = {
"positionClass": "toast-top-right",
"closeButton": true,
"progressBar": true,
"showEasing": "swing",
"timeOut": "6000"
};
},1600)


});
</script> -->
</body>
</html>
