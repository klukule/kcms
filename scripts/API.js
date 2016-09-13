//Load all components
require("components/menuShortcut.js");
require("components/menuCategory.js");

require("components/page.js");
require("components/header.js");
require("components/table.js");
require("components/textBox.js");
require("components/wysiwygEditor.js");
require("components/button.js");

require("../version.js");

$(".navbar-brand span").text("v "+Version.major+"."+Version.minor+"."+Version.patch);

var API = {};

API.MenuShortcuts = {};
API.ClickCallbacks = {};

API.Pages = {};
API.Modules = {};

API.RegenerateMenuShortcuts = function(){
  var target = $("#SideNav");
  target.html("");
  for(var i in API.MenuShortcuts){
    var index = API.MenuShortcuts[i];
    index.GenerateCode(target);
  }
  API.ResetClicks();
}

API.ResetClicks = function(){
  for(var i in API.ClickCallbacks){
    $("#"+i).attr('onClick', 'eval(API.ClickCallbacks["'+i+'"]());');
  }
}

API.AddMenuShortcut = function(id, dispName){
  API.MenuShortcuts[id] = new MenuShortcut(id, dispName);
  API.RegenerateMenuShortcuts();
  return API.MenuShortcuts[id];
};

API.GetMenuShortcut = function(id){
  return API.MenuShortcuts[id];
}
API.MenuShortcutDeactivate = function(){
  for(var i in API.MenuShortcuts){
    var index = API.MenuShortcuts[i];
    index.Deactivate();
  }}
  API.RemoveMenuShortcut = function(id){
    delete API.MenuShortcuts[id];
    API.RegenerateMenuShortcuts();
  }

  API.AddMenuCategory = function(id, dispName){
    API.MenuShortcuts[id] = new MenuCategory(id, dispName);
    API.RegenerateMenuShortcuts();
  }

  API.OnClick = function(id, callback){
    API.ClickCallbacks[id] = callback;
    API.ResetClicks();
  }

  API.AddPage = function(name){
    API.Pages[name] = new Page();
    return API.Pages[name];
  }

  API.GetPage = function(name){
    return API.Pages[name];
  }

  API.TogglePage = function(name){
    API.Pages[name].Toggle();
    API.RenewToken();
  }

  API.RegisterModule = function(name){
    API.Modules[name] = true;
  }

  API.UnregisterModule = function(name){
    delete API.Modules[name];
  }

  API.CheckDependency = function(name){
    if(API.Modules[name] === undefined){
      return false;
    }
    return true;
  }

  API.ShowWarning = function(title, content){
    toastr.warning(content,title,[]);
  }

  API.ShowInfo = function(title, content){
    toastr.info(content,title,[]);
  }

  API.ShowError = function(title, content){
    toastr.error(content,title,[]);
  }

  API.ShowSuccess = function(title, content){
    toastr.success(content,title,[]);
  }

  API.RegisterCommand = function(command, action){
    API[command] = action;
  }

  API.ExecuteNativeCommand = function(endpoint, type, data, headers, callback) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        callback(jQuery.parseJSON(this.responseText));
      }
    });

    xhr.open(type, "natives/"+endpoint+".php");
    var setCT = true;
    if(Object.keys(headers).length > 0)
    for (var variable in headers) {
      if (headers.hasOwnProperty(variable)) {
        xhr.setRequestHeader(variable, headers[variable]);
      }
    }
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(jQuery.param(data));
  }

  API.ExecuteNativeCommandFormData = function(endpoint, type, data, headers, callback) {


    var formData = new FormData();

    if(Object.keys(data).length > 0)
    for (var variable in data) {
      if (data.hasOwnProperty(variable)) {
        console.log(variable + " - " + data[variable]);
        formData.append(variable,data[variable]);
      }
    }
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        callback(jQuery.parseJSON(this.responseText));
      }
    });

    xhr.open(type, "natives/"+endpoint+".php");

    if(Object.keys(headers).length > 0)
    for (var variable in headers) {
      if (headers.hasOwnProperty(variable)) {
        xhr.setRequestHeader(variable, headers[variable]);
      }
    }
    // xhr.setRequestHeader("content-type", "multipart/form-data");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(formData);
  }

  API.GetCurentUserInfo = function(callback){
    API.ExecuteNativeCommand("GetUserInfo","POST",{"username":$.cookie('username')},"",function(data){
      if(data.status == "error"){
        API.ShowError("GetCurrentUserInfo failed",data.message + "<br>Please reload page");
        callback(data);
      }else{
        callback(data);
      }
    });
  }

  API.GetUserInfo = function(username, callback){
    API.ExecuteNativeCommand("GetUserInfo","POST",{"username":username},"",function(data){
      if(data.status == "error"){
        API.ShowError("GetUserInfo failed",data.message + "<br>Please reload page");
        callback(data);
      }else{
        callback(data);
      }
    });
  }

  API.GetUserInfoId = function(id, callback){
    API.ExecuteNativeCommand("GetUserInfo","POST",{"id":id},"",function(data){
      if(data.status == "error"){
        API.ShowError("GetUserInfo failed",data.message + "<br>Please reload page");
        callback(data);
      }else{
        callback(data);
      }
    });
  }

  API.CheckVersion = function(){
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var getVersion = jQuery.parseJSON(this.responseText);
        if(getVersion.major > Version.major){
          API.ShowInfo("New Major Release","We have updated KCMS, please contact us for update");
          return;
        }
        if(getVersion.minor > Version.minor){
          API.ShowInfo("New Minor Release","We have updated KCMS, please contact us for update");
          return;
        }
        if(getVersion.patch > Version.patch){
          API.ShowInfo("New Patch Release","We have updated KCMS, please contact us for update");
          return;
        }
      }
    });

    xhr.open("GET", "http://kcms.moowdesign.eu/Version.php");
    xhr.send();
  }

  API.GenerateGUID = function(){
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  API.GenerateModalHTML = function(id, header = "",body="",footer=""){
    var code = '<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;"><div class="modal-dialog"><div class="modal-content">';
    if(header != "")
    code += '<div class="modal-header text-center">'+header+"</div>";

    if(body != "")
    code += '<div class="modal-body">'+body+"</div>";

    if(footer != "")
    code += '<div class="modal-footer">'+footer+"</div>";

    code += '</div></div></div>';

    return code;
  }

  API.RenewToken = function(){
    API.ExecuteNativeCommand("RenewToken","GET",{},"",function(resp){});
  }
