function Button(text) {
  this.OnClick = function(){};
  this.GUID = API.GenerateGUID();

  var tt = "btn-default";

  this.SetType = function(type){
    if(type != tt){
      tt = type;
      $("#"+this.GUID).removeClass(tt);
      $("#"+this.GUID).addClass(type);
    }
  }

  this.GetType = function(){
    return tt;
  }

  this.SetText = function(text){
    $("#"+this.GUID).text(text);
  }

  this.GetText = function(){
    return $("#"+this.GUID).text();
  }

  this.GenerateCode = function(parent){
    var code = '<a href="#" class="btn btn-w-md btn-default" id="'+this.GUID+'">'+text+'</a>';
    $("#"+parent).append(code);
    $("#"+this.GUID).click(this.OnClick);
  }
}
