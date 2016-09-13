function Articles(){
  //Register module
  API.RegisterModule("Articles");

  //Register Custom commands

  API.Articles = {};

  API.Articles.AddNewPost = function(){

    var title = addTitle.GetValue();
    var content = addTextArea.GetValue();

    if(title == ""){
      API.ShowError("Blank title not allowed","You must fill title field");
      return;
    }
    if(content == ""){
      API.ShowError("Blank content not allowed","You must fill content field");
      return;
    }
    API.MenuShortcutDeactivate();
    API.GetMenuShortcut("posts").Activate();
    API.GetMenuShortcut("posts").GetMenuShortcut("allPosts").Activate();
    API.GetMenuShortcut("posts").Toggle();
    API.TogglePage("postList");
    API.GetCurentUserInfo(function(uinfo){
      API.ExecuteNativeCommand("AddPost","POST",{"title":title,"text":content,"uid":uinfo.id},"",function(resp){
        if(resp.status == "success"){
          API.Articles.RegenTable();
          API.ShowSuccess("Post updated","Post was successfully created");
        }else{
          API.Articles.RegenTable();
          API.ShowError("Post creation failed",resp.message);
        }
      });
    });
  }

  API.Articles.EditPost = function(id){
    API.GetMenuShortcut("posts").Deactivate();
    API.GetMenuShortcut("posts").Activate();
    API.GetMenuShortcut("posts").Toggle();
    editButton.OnClick = function(){
      API.Articles.UpdatePost(id);
    }
    API.TogglePage("editPost");

    API.ExecuteNativeCommand("GetPosts","GET","","",function(data){
      for (var postNum in data.posts) {
        if(data.posts[postNum].id == id){
          editTitle.SetValue(data.posts[postNum].title);
          editTextArea.SetValue(data.posts[postNum].text);
          break;
        }
      }
    });
  }

  API.Articles.UpdatePost = function(id){
    var title = editTitle.GetValue();
    var content = editTextArea.GetValue();

    API.MenuShortcutDeactivate();
    API.GetMenuShortcut("posts").Activate();
    API.GetMenuShortcut("posts").GetMenuShortcut("allPosts").Activate();
    API.GetMenuShortcut("posts").Toggle();
    API.TogglePage("postList");
    API.GetCurentUserInfo(function(uinfo){
      API.ExecuteNativeCommand("UpdatePost","POST",{"id":id,"title":title,"text":content,"uid":uinfo.id},"",function(resp){
        if(resp.status == "success"){
          API.Articles.RegenTable();
          API.ShowSuccess("Post updated","Post was successfully updated");
        }else{
          API.Articles.RegenTable();
          API.ShowError("Post update failed",resp.message);
        }
      });
    });
  }

  API.Articles.DeletePost = function(id){
    API.ExecuteNativeCommand("RemovePost","POST",{"id":id},"",function(resp){
      if(resp.status == "success"){
        API.Articles.RegenTable();
      }else{
        API.ShowError("Error deleting post",resp.message);
      }
    });
  }

  API.Articles.ShowRemoveModal = function(id){
    if ( $( "#aRemModal" ).length ) {
      $( "#aRemModal" ).remove();
    }
    var head = "";
    var body = '<h4 class="modal-title">Do you want to remove this post?</h4><small>You can\'t undo this action</small>';
    var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-danger" data-dismiss="modal" onclick="API.Articles.DeletePost('+id+')">Remove</button>';

    $('body').append(API.GenerateModalHTML("aRemModal",head,body,footer));
    $("#aRemModal").modal();
  }

  API.Articles.RegenTable = function(){
    postTable.ClearRows();
    postTable.AddRow(["Loading...","","",""]);
    API.TogglePage("postList");
    API.ExecuteNativeCommand("GetPosts","GET","","",function(data){
      var userInfo = [];
      postTable.ClearRows();
      for (var postId in data.posts) {
        var d = new Date(data.posts[postId].date);
        var date = d.getDate()  + "." + (d.getMonth()+1) + "." + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
        var ItemGUID = API.GenerateGUID();
        postTable.AddRow([data.posts[postId].title,'<span id="'+ItemGUID+'">Loading...</span>',date,'<a class="btn btn-danger" style="float:right;" onclick="API.Articles.ShowRemoveModal('+data.posts[postId].id+')"><i class="fa fa-trash-o"></i></a><a class="btn btn-info" style="float:right;margin-right:5px;"onclick="API.Articles.EditPost('+data.posts[postId].id+')"><i class="fa fa-pencil"></i></a>']);
        API.TogglePage("postList");

        API.Articles.GetAuthor(ItemGUID,data.posts[postId].uid);
      }
    });
  }

  API.Articles.GetAuthor = function(guid, uid){
    API.GetUserInfoId(uid,function(userInfo){
      $("#"+guid).text(userInfo.display_name);
    });
  }

  //Add menu element
  API.AddMenuShortcut("posts","Posts");
  API.GetMenuShortcut("posts").AddMenuShortcut("allPosts","All Posts");
  API.GetMenuShortcut("posts").AddMenuShortcut("addNewPost","Add New");

  //Create new page
  var posts = API.AddPage("postList");
  var addNewPost = API.AddPage("addNewPost");
  var editPost = API.AddPage("editPost");
  //Add component
  posts.AddComponent("header",new Header("pe-7s-bookmarks","Posts","Here you can see, create, edit and remove them"));
  var postTable = posts.AddComponent("posts", new Table());
  postTable.AddColumn("Name");
  postTable.AddColumn("Author");
  postTable.AddColumn("Date");
  postTable.AddColumn(""); //Buttons, don't need title (title is aligned to left :D )

  addNewPost.AddComponent("header",new Header("pe-7s-pen","Add new post","Here you can write new post and publish it"));

  var addTitle = addNewPost.AddComponent("titleTextBox",new TextBox("Title",""));
  var addTextArea = addNewPost.AddComponent("contentTextArea",new WysiwygEditor("Content",""));
  var addButton = addNewPost.AddComponent("sendButton",new Button("Publish"));

  editPost.AddComponent("header",new Header("pe-7s-pen","Edit post","Here you can edit post"));

  var editTitle = editPost.AddComponent("etitleTextBox",new TextBox("Title",""));
  var editTextArea = editPost.AddComponent("econtentTextArea",new WysiwygEditor("Content",""));
  var editButton = editPost.AddComponent("esendButton",new Button("Update"));
  //Onclick
  API.OnClick("allPosts",function(){
    API.MenuShortcutDeactivate();
    API.GetMenuShortcut("posts").Activate();
    API.GetMenuShortcut("posts").GetMenuShortcut("allPosts").Activate();
    API.GetMenuShortcut("posts").Toggle();
    API.TogglePage("postList");
    API.Articles.RegenTable();
  });

  API.OnClick("addNewPost",function(){
    API.MenuShortcutDeactivate();
    API.GetMenuShortcut("posts").Activate();
    API.GetMenuShortcut("posts").GetMenuShortcut("addNewPost").Activate();
    API.GetMenuShortcut("posts").Toggle();
    addButton.OnClick = function(){API.Articles.AddNewPost();};
    API.TogglePage("addNewPost");
  });
}
