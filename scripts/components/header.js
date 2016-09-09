function Header(icon, title, subtitle){

  this.GenerateCode = function(parent){
    var code = "";
    code += '<div class="row"><div class="col-lg-12"><div class="view-header"><div class="header-icon"><i class="pe page-header-icon '+icon+'"></i></div>';
    code += '<div class="header-title"><h3 class="m-b-xs">'+title+'</h3><small>'+subtitle+'</small></div></div><hr></div></div>';
    $("#"+parent).append(code);
  }
}
