function Page(){
  this.Components = {};
  this.AddComponent = function(name, component){
    this.Components[name] = component;
    return this.Components[name];
  }

  this.GetComponent = function(name){
    return this.Components[name];
  }

  this.RemoveComponent = function(name){
    delete this.Components[name];
  }
  this.Toggle = function(){
    $("#container").html("");
    for(var c in this.Components){
      this.Components[c].GenerateCode("container");
    }
  }
}
