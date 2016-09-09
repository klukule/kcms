function Dashboard(){
  //Register module
  API.RegisterModule("Dashboard");

  //Add menu click
  API.AddMenuShortcut("dashboard","Dashboard");

  //Automaticaly show page
  API.MenuShortcutDeactivate();
  API.GetMenuShortcut("dashboard").Activate();

  //Create new page
  var dash = API.AddPage("dashboard");

  //Add components
  dash.AddComponent("header",new Header("pe-7s-home","KCMS Dashboard","Welcome to KCMS Dashboard panel, installed modules will make it's widgets here"));

  //Show page
  API.TogglePage("dashboard");

  //Onclick
  API.OnClick("dashboard",function(){
    API.MenuShortcutDeactivate();
    API.GetMenuShortcut("dashboard").Activate();
    API.TogglePage("dashboard");
  });
}
