function MenuShortcut(id, dispName){
  if(id === undefined){
    throw "MenuShortcut ~ Id not defined";
  }
  if(dispName === undefined){
      throw "MenuShortcut ~ Display name not defined";
  }
  this.Id = id;
  this.Name = dispName;
  this.Parent = null;
  this.Active = false;
  this.MenuShortcuts = {};

  this.AddMenuShortcut = function(id, dispName){
    this.MenuShortcuts[id] = new MenuShortcut(id, dispName);
    this.MenuShortcuts[id].Parent = this;
    API.RegenerateMenuShortcuts();
  };

  this.GetMenuShortcut = function(id){
    return this.MenuShortcuts[id];
  }

  this.RemoveMenuShortcut = function(id){
    delete this.MenuShortcuts[id];
    API.RegenerateMenuShortcuts();
  }
  this.Toggle = function(){
    $("#"+this.Id).trigger( "click" );
  }
    this.GenerateCode = function(target){
      var toApp = "";
      toApp += "<li ";
      if(this.Active){
        toApp += "class='active'";
      }
      toApp += ">";

      toApp += ' <a href="#'+this.Id+'Drop" data-toggle="collapse" aria-expanded="false" id="'+this.Id+'">';

      toApp += this.Name;
      if(Object.keys(this.MenuShortcuts).length > 0){
        toApp +=        '<span class="sub-nav-icon"> <i class="stroke-arrow"></i> </span>';
      }
      toApp +=     '</a>';
      toApp +=  '   <ul id="'+this.Id+'Drop" class="nav nav-second collapse">';
      toApp += "   </ul>";
      toApp += "</li>";
      if(this.Parent != null){
        target = $("#" + target + "Drop");
      }
      target.append(toApp);
      for(var i in this.MenuShortcuts){
        this.MenuShortcuts[i].GenerateCode(this.Id); //Set target to this
      }
    }
  this.Activate = function(){
    this.Active = true;
    API.RegenerateMenuShortcuts();
  }
  this.Deactivate = function(){
    this.Active = false;
    for(var i in this.MenuShortcuts){
      this.MenuShortcuts[i].Deactivate();
    }
  }
}
