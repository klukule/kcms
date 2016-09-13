//Load modules
require("Modules/dashboard.js");
require("Modules/articles.js");
require("Modules/users.js");

require("Modules/metin2.js");
require("Modules/metin2/serverStatus.js");

//Initialize modules
new Dashboard();
new Articles();
new Users();

//Unfinished
//new Metin2();
//new Metin2ServerStatus();
