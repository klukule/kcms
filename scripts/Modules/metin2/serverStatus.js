function Metin2ServerStatus() {
  if(!API.CheckDependency("Metin2")){
    throw "Required module not found (Metin2)";
    return;
  }

  //Register module
  API.RegisterModule("Metin2 Server Status");
  API.AddMenuShortcut("serverStatus","Server Status");

}
