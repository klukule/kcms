function MenuCategory(id, dispName){
  if(id === undefined){
    throw "MenuCategory ~ Id not defined";
  }
  if(dispName === undefined){
      throw "MenuCategory ~ Display name not defined";
  }
  this.Id = id;
  this.Name = dispName;
  this.Parent = null;
  this.MenuShortcuts = {};

  this.AddMenuShortcut = function(id, dispName){
    this.MenuShortcuts[id] = new MenuShortcut(dispName);
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

  this.GenerateCode = function(target){
    target.append('<li class="nav-category"  id="'+this.Id+'">'+this.Name+'</li>');
    for(var i in this.MenuShortcuts){
      this.MenuShortcuts[i].GenerateCode(this.Id); //Set target to this
    }
  }
  this.Activate = function(){
    //Blank
  }
  this.Deactivate = function(){
    //Blank
  }
}
