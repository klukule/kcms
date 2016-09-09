function TextBox(placeholder, value){

  this.GUID = API.GenerateGUID();

  this.SetValue = function(text){
    $("#"+this.GUID + " input").val(text);
  }

  this.GetValue = function(){
    return $("#"+this.GUID + " input").val();
  }

  this.SetPlaceholder = function(text){
    $("#"+this.GUID + " label").text(text);
  }

  this.GetPlaceholder = function(){
    return $("#"+this.GUID + " label").text();
  }

  this.GenerateCode = function(parent){
    var code = '<div class="form-group" id="'+this.GUID+'"><label>'+placeholder+'</label><input type="text" class="form-control" placeholder="'+placeholder+'" value="'+value+'"></div>';
    $("#"+parent).append(code);
  }
}
