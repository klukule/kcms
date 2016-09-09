function Table(){
  var columns = [];
  var rows = [];
  this.AddColumn = function(name){
    columns.push(name);
  }

  this.AddRow = function(values) {
    rows.push(values);
  }

  this.ClearRows = function(){
    rows = [];
  }

  this.GenerateCode = function(parent){
    var code = '<div class="table-responsive"><table class="table table-hover table-striped"><thead><tr>';
    for (var column in columns) {
      code += "<th>"+columns[column]+"</th>";
    }
    code+= "</tr></thead><tbody>";
    for (var row in rows) {
      code += "<tr>";
      for (var rowItem in rows[row]) {
        code += "<td style='line-height: 34px;'>"+rows[row][rowItem]+"</td>";
      }
      code += "</tr>";
    }
    code += "</tbody></table></div>";
    $("#"+parent).append(code);
  }
}
