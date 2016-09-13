function Users(){
  //Register module
  API.RegisterModule("Users");
  //Register Custom commands
  API.Users = {};

  API.Users.DeleteUser = function(id){
    API.ExecuteNativeCommand("RemoveUser","POST",{"id":id},"",function(resp){
      if(resp.status == "success"){
        API.Users.RegenTable();
      }else{
        API.ShowError("Error removing user",resp.message);
      }
    });
  }

  API.Users.ShowRemoveModal = function(id){
    if ( $( "#uRemModal" ).length ) {
      $( "#uRemModal" ).remove();
    }
    var head = "";
    var body = '<h4 class="modal-title">Do you want to remove this user?</h4><small>You can\'t undo this action</small>';
    var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-danger" data-dismiss="modal" onclick="API.Users.DeleteUser('+id+')">Remove</button>';

    $('body').append(API.GenerateModalHTML("uRemModal",head,body,footer));
    $("#uRemModal").modal();
  }

  API.Users.ShowPassRecModal = function(id){
    if ( $( "#uPassRecModal" ).length ) {
      $( "#uPassRecModal" ).remove();
    }

    var textBoxGUID = API.GenerateGUID();

    var head = '<h4 class="modal-title">Password recovery URL</h4><small>Use this URL for password recovery, if this is for currently logged account, you will be logged out</small>';
    var body = '<div class="btn-group" style="width:100%"><input type="text" readonly id="'+textBoxGUID+'" class="form-control", placeholder="Generating..." style="display:inline-block;width:calc(100% - 134.8px);border-top-right-radius: 0;border-bottom-right-radius: 0;"></input><button type="submit" style="float:right;" class="btn btn-default" onclick="API.Users.CopyToClipboard(\''+textBoxGUID+'\')">Copy to clipboard</button></div>';
    var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">OK</button>';

    $('body').append(API.GenerateModalHTML("uPassRecModal",head,body,footer));
    $("#uPassRecModal").modal();

    API.ExecuteNativeCommand("GenerateRecoveryToken","POST",{"id":id},"",function(resp){
      if(resp.status == "success"){
        $("#"+textBoxGUID).val(resp.prc);
      }else{
        API.ShowError("Error generating token",resp.message);
      }
    });

  }

  API.Users.CopyToClipboard = function(guid){
    if($("#"+guid).val().length > 0){
      $("#"+guid).select();
      document.execCommand("copy");
      API.ShowSuccess("Coppied","Password recovery URL coppied to clipboard");
    }else{
      API.ShowError("Can't copy","Password recovery URL not yet generated");
    }
  }

  API.Users.ShowAddUserModal = function(){
    if ( $( "#uAddUserModal" ).length ) {
      $( "#uAddUserModal" ).remove();
    }

    var usernameGUID = API.GenerateGUID();
    var displayNameGUID = API.GenerateGUID();
    var buttonGUID = API.GenerateGUID();
    var head = '<h4 class="modal-title">Add new user</h4><small>This will create new user without password, use "Recover password" to setup password</small>';
    var body = '<div class="form-group"><label for="'+usernameGUID+'">Username</label> <input type="text" class="form-control" id="'+usernameGUID+'" placeholder="Username"></div><div class="form-group"><label for="'+displayNameGUID+'">Display Name</label> <input type="text" class="form-control" id="'+displayNameGUID+'" placeholder="Display Name"></div>';
    var footer = '<button type="button" class="btn btn-default" id="'+buttonGUID+'" onclick="API.Users.CreateUser(\''+usernameGUID+'\',\''+displayNameGUID+'\',\''+buttonGUID+'\');">OK</button>';

    $('body').append(API.GenerateModalHTML("uAddUserModal",head,body,footer));
    $("#uAddUserModal").modal();
  }

  API.Users.CreateUser = function(username,displayName,button){
    var usel = $("#"+username);
    var dnel = $("#"+displayName);
    var buel = $("#"+button);
    buel.val('<i class="fa fa-spinner fa-spin"></i><span class="bold">Processing</span>');
    API.ExecuteNativeCommand("CreateUser","POST",{"username":usel.val(),"display_name":dnel.val()},"",function(resp){
      buel.val("OK");
      if(resp.status == "success"){
        $("#uAddUserModal").modal('hide');
        API.ShowSuccess("Success","Created user '"+dnel.val()+"'");
        API.Users.RegenTable();
      }else{
        API.ShowError("Error creating user",resp.message);
      }
    });
  }

  API.Users.ShowEditUserModal = function(id){
    if ( $( "#uEditUserModal" ).length ) {
      $( "#uEditUserModal" ).remove();
    }
    API.GetUserInfoId(id, function(data){
      var futbGUID = API.GenerateGUID();
      var finputGUID = API.GenerateGUID();
      var avatarGUID = API.GenerateGUID();
      var displayNameGUID = API.GenerateGUID();
      var head = '<h4 class="modal-title">Update user</h4><small>You can edit informations about user here</small>';
      var body = '<div class="text-center" style="width:100%;margin-bottom:10px;"><img src="'+data.avatar+'?time='+$.now()+'" class="img-circle" alt="" id="'+avatarGUID+'" style="width:200px;height:200px"></div>';
      body+= '<div class="form-group"><label for="'+futbGUID+'">Avatar</label> <div class="btn-group" style="width:100%"><input type="text" readonly id="'+futbGUID+'" class="form-control", placeholder="Avatar" style="display:inline-block;width:calc(100% - 69.83px);border-top-right-radius: 0;border-bottom-right-radius: 0;"></input><div style="float:right;position: relative; overflow: hidden;" class="btn btn-default"><span>Upload</span><input type="file" style="position: absolute;top: 0;right: 0;margin: 0;padding: 0;font-size: 20px;cursor: pointer;opacity: 0;filter: alpha(opacity=0);" class="upload" id="'+finputGUID+'"/></div></div></div>';
      body+= '<div class="form-group"><label for="'+displayNameGUID+'">Display name</label> <input type="text" class="form-control" id="'+displayNameGUID+'" placeholder="Display name" value="'+data.display_name+'"></div>';
      var footer = '<button type="button" class="btn btn-default" onclick="API.Users.UpdateUser('+id+',\''+finputGUID+'\',\''+displayNameGUID+'\');">Update</button>';
      $('body').append(API.GenerateModalHTML("uEditUserModal",head,body,footer));
      $("#uEditUserModal").modal();


      $("#"+finputGUID).change(function(){
        $("#"+futbGUID).val(this.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#'+avatarGUID).attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
      });
    });

  }

  API.Users.UpdateUser = function(id, fileInputID, display_nameID){
    var file = $("#"+fileInputID).prop("files")[0] ? $("#"+fileInputID).prop("files")[0] : "dnu";
    console.log(id);
    API.ShowInfo("Avatar upload","Picture upload has begun, please be patient");
    API.ExecuteNativeCommandFormData("UpdateUser","POST",{"uid":id, "avatar":file,"display_name":$("#"+display_nameID).val()},{},function(resp){
      if(resp.status == "success"){
        $("#uEditUserModal").modal('hide');
        API.ShowSuccess("Success","updated user '"+$("#"+display_nameID).val()+"'");
        API.Users.RegenTable();
        API.GetCurentUserInfo(function(data){
          if(data.status == "success"){
            $("#userDisplayName").html(data.display_name);
            $("#userAvatar").attr("src",data.avatar+'?time='+$.now());
          }
        });
      }else{
        API.ShowError("Error updating user",resp.message);
      }
    });
  }

  API.Users.RegenTable = function(){
    usersTable.ClearRows();
    usersTable.AddRow(["Loading...","",""]);
    API.TogglePage("usersPage");
    API.ExecuteNativeCommand("GetUserList","GET","","",function(data){
      usersTable.ClearRows();
      for (var userId in data.users) {
        usersTable.AddRow([data.users[userId].display_name,data.users[userId].username,'<a class="btn btn-danger" style="float:right;" onclick="API.Users.ShowRemoveModal('+data.users[userId].id+')"><i class="fa fa-trash-o"></i></a><a class="btn btn-accent" style="float:right;margin-right:5px" onclick="API.Users.ShowPassRecModal('+data.users[userId].id+')"><i class="fa fa-key"></i></a><a class="btn btn-info" style="float:right;margin-right:5px;" onclick="API.Users.ShowEditUserModal('+data.users[userId].id+')"><i class="fa fa-pencil"></i></a>']);
        API.TogglePage("usersPage");
      }
    });
  }

  API.AddMenuShortcut("users","Users");

  var users = API.AddPage("usersPage");
  //Add component
  users.AddComponent("header",new Header("pe-7s-user","Users","Here you can see, create, and remove users, which are able to access KCMS"));
  var usersTable = users.AddComponent("users", new Table());
  usersTable.AddColumn("Display Name");
  usersTable.AddColumn("Username");
  usersTable.AddColumn('<a class="btn btn-success" style="float:right;" onclick="API.Users.ShowAddUserModal()"><i class="fa fa-plus"></i></a>');

  //Onclick
  API.OnClick("users",function(){
    API.MenuShortcutDeactivate();
    API.GetMenuShortcut("users").Activate();
    API.TogglePage("usersPage");
    API.Users.RegenTable();
  });
}
