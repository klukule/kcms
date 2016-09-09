function WysiwygEditor(placeholder, value){
  this.GUID = API.GenerateGUID();
  var innerGUID = API.GenerateGUID();

  this.GetValue = function(){
    return $("#"+innerGUID).html();
  }

  this.SetValue = function(value){
    $("#"+innerGUID).html(value);
  }

  this.SetPlaceholder = function(placeholder){
    $("#"+this.GUID + " label").text(placeholder);
  }

  this.GenerateCode = function(parent){
    var code = '<div class="form-group" id="'+this.GUID+'"><label>'+placeholder+'</label>';
    code += '<div class="btn-toolbar" data-role="editor-toolbar" data-target="#'+innerGUID+'">';
    code += '  <div class="btn-group">';
    code += '    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Font Size"><i class="glyphicon glyphicon-text-height"></i>&nbsp;<b class="caret"></b></a>';
    code += '      <ul class="dropdown-menu">';
    code += '      <li><a data-edit="fontSize 5"><font size="5">Huge</font></a></li>';
    code += '      <li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>';
    code += '      <li><a data-edit="fontSize 1"><font size="1">Small</font></a></li>';
    code += '      </ul>';
    code += '  </div>';
    code += '  <div class="btn-group">';
    code += '    <a class="btn btn-default" data-edit="bold" title="" data-original-title="Bold (Ctrl/Cmd+B)"><i class="glyphicon glyphicon-bold"></i></a>';
    code += '    <a class="btn btn-default" data-edit="italic" title="" data-original-title="Italic (Ctrl/Cmd+I)"><i class="glyphicon glyphicon-italic"></i></a>';
    // code += '    <a class="btn btn-default" data-edit="strikethrough" title="" data-original-title="Strikethrough"><i class="glyphicon glyphicon-strikethrough"></i></a>';
    // code += '    <a class="btn btn-default" data-edit="underline" title="" data-original-title="Underline (Ctrl/Cmd+U)"><i class="glyphicon glyphicon-underline"></i></a>';
    code += '  </div>';
    code += '  <div class="btn-group">';
    code += '    <a class="btn btn-default" data-edit="insertunorderedlist" title="" data-original-title="Bullet list"><i class="glyphicon glyphicon-list"></i></a>';
    code += '    <a class="btn btn-default" data-edit="insertorderedlist" title="" data-original-title="Number list"><i class="glyphicon glyphicon-list-alt"></i></a>';
    code += '    <a class="btn btn-default" data-edit="outdent" title="" data-original-title="Reduce indent (Shift+Tab)"><i class="glyphicon glyphicon-indent-left"></i></a>';
    code += '    <a class="btn btn-default" data-edit="indent" title="" data-original-title="Indent (Tab)"><i class="glyphicon glyphicon-indent-right"></i></a>';
    code += '  </div>';
    code += '  <div class="btn-group">';
    code += '    <a class="btn btn-default" data-edit="justifyleft" title="" data-original-title="Align Left (Ctrl/Cmd+L)"><i class="glyphicon glyphicon-align-left"></i></a>';
    code += '    <a class="btn btn-default" data-edit="justifycenter" title="" data-original-title="Center (Ctrl/Cmd+E)"><i class="glyphicon glyphicon-align-center"></i></a>';
    code += '    <a class="btn btn-default" data-edit="justifyright" title="" data-original-title="Align Right (Ctrl/Cmd+R)"><i class="glyphicon glyphicon-align-right"></i></a>';
    code += '    <a class="btn btn-default" data-edit="justifyfull" title="" data-original-title="Justify (Ctrl/Cmd+J)"><i class="glyphicon glyphicon-align-justify"></i></a>';
    code += '  </div>';
    code += '  <div class="btn-group">';
    code += '  <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Hyperlink"><i class="glyphicon glyphicon-link"></i></a>';
    code += '    <div class="dropdown-menu input-append">';
    code += '	    <input class="span2" placeholder="URL" type="text" data-edit="createLink">';
    code += '	    <button class="btn btn-default" type="button">Add</button>';
    code += '    </div>';
    code += '    <a class="btn btn-default" data-edit="unlink" title="" data-original-title="Remove Hyperlink"><i class="glyphicon glyphicon-remove"></i></a>';

    code += '  </div>';

    //code += '  <div class="btn-group">';
    code += '    <a class="btn btn-default" title="" id="pictureBtn" onclick="$(\'#fakeFile\').click();" data-original-title="Insert picture (or just drag &amp; drop)"><i class="glyphicon glyphicon-picture"></i></a>';
    code += '    <input type="file" data-role="magic-overlay" id="fakeFile" data-target="#pictureBtn" data-edit="insertImage" style="opacity: 0; position: absolute; top: 0px; left: 0px; width: 37px; height: 30px;">';
    //code += '  </div>';
    code += '  <div class="btn-group">';
    code += '    <a class="btn btn-default" data-edit="undo" title="" data-original-title="Undo (Ctrl/Cmd+Z)"><i class="glyphicon glyphicon-backward"></i></a>';
    code += '    <a class="btn btn-default" data-edit="redo" title="" data-original-title="Redo (Ctrl/Cmd+Y)"><i class="glyphicon glyphicon-forward"></i></a>';
    code += '  </div>';
    code += '  <input type="text" data-edit="inserttext" id="voiceBtn" x-webkit-speech="" style="display: none;">';
    code += '</div>';
    code += '<div id="'+innerGUID+'" class="form-control" style="min-height:300px;overflow-y:auto;margin-top:10px;">'+value+'</div></div>';

    $("#"+parent).append(code);
    $("#"+innerGUID).wysiwyg();
    $("#"+innerGUID).cleanHtml();
  }
}
