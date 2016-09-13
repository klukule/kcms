
//Script load macro
function require( url ) {
    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', "scripts/" + url + "?" + (new Date).getTime(), false ); // <-- the 'false' makes it synchronous
    ajax.onreadystatechange = function () {
        var script = ajax.response || ajax.responseText;
        if (ajax.readyState === 4) {
            switch( ajax.status) {
                case 200:
                    eval.apply( window, [script] );
                    console.log("script loaded: ", url);
                    break;
                default:
                    console.log("ERROR: script not loaded: ", url);
            }
        }
    };
    ajax.send(null);
}



require("API.js");

API.AddMenuCategory("main","Main");
API.CheckVersion();

require("config.js");


$(document).ready(function () {

  toastr.options = {
    "positionClass": "toast-top-right",
    "closeButton": true,
    "progressBar": true,
    "showEasing": "swing",
    "timeOut": "6000"
  };

  /*var clog = console.log;
  var cerror = console.error;
  var cdebug = console.debug;
  var cinfo = console.info;

  console.log = function(message) {API.ShowSuccess("Log",message); clog(message);};
  console.error = function(message) {API.ShowError("Error",message); cerror(message);};
  console.debug = function(message) {API.ShowSuccess("Debug",message); cdebug(message);};
  console.info = function(message) {API.ShowInfo("Info",message); cinfo(message);};*/

    // Handle minimalize left menu
    $('.left-nav-toggle a').on('click', function(event){
        event.preventDefault();
        $("body").toggleClass("nav-toggle");
    });


    // Hide all open sub nav menu list
    $('.nav-second').on('show.bs.collapse', function () {
        $('.nav-second.in').collapse('hide');
    })

    // Handle panel toggle
    $('.panel-toggle').on('click', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        var icon = $(event.target).closest('i');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });

    // Handle panel close
    $('.panel-close').on('click', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        hpanel.remove();
    });
});
