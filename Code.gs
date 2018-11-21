///////////////////////////////////////////////////////////////
//   ad custom menu when the spread sheet opens
///////////////////////////////////////////////////////////////
var UIONOFF = true;
var LOGSALES = false; // Enables Sales Logs
var LOGSDATA = true; // Enables Sheet Logs
var LOGDATA = true; // Enables Data Logs
var LOGODATA = false; // Enables Order Logs

/**
 * Adds a custom menu with items to show the sidebar, dialog and to manually activate the data fetch calls
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Dragon Menu')
  .addSubMenu(ui.createMenu('Georgetown')
              .addItem('Update Sales', 'updateSaleItems1')
              .addItem('Reload Sales', 'resetSaleItems1')
              .addItem('Load Orders', 'updateOrderItems1')) 
  .addSeparator()
  .addSubMenu(ui.createMenu('Milton')
              .addItem('Update Sales', 'updateSaleItems2')
              .addItem('Reload Sales', 'resetSaleItems2')
              .addItem('Load Orders', 'updateOrderItems2'))  
  .addSeparator()
  .addSubMenu(ui.createMenu('5&10')
              .addItem('Update Sales', 'updateSaleItems3')
              .addItem('Reload Sales', 'resetSaleItems3')
              .addItem('Load Orders', 'updateOrderItems3'))
  .addSeparator()
  .addSubMenu(ui.createMenu('Fergus')
              .addItem('Update Sales', 'updateSaleItems4')
              .addItem('Reload Sales', 'resetSaleItems4')
              .addItem('Load Orders', 'updateOrderItems4'))  
  .addSeparator()
  .addSubMenu(ui.createMenu('Brampton')
              .addItem('Update Sales', 'updateSaleItems5')
              .addItem('Reload Sales', 'resetSaleItems5')
              .addItem('Load Orders', 'updateOrderItems5')) 
  .addSeparator()
  .addSubMenu(ui.createMenu('Dixie')
              .addItem('Update Sales', 'updateSaleItems6')
              .addItem('Reload Sales', 'resetSaleItems6')
              .addItem('Load Orders', 'updateOrderItems6'))
  .addSeparator()
  .addSubMenu(ui.createMenu('Dundas')
              .addItem('Update Sales', 'updateSaleItems7')
              .addItem('Reload Sales', 'resetSaleItems7')
              .addItem('Load Orders', 'updateOrderItems7'))  
  .addSeparator()
  .addSubMenu(ui.createMenu('Employee')
              .addItem('Refresh Data', 'employeeData'))
  .addSubMenu(ui.createMenu('Admin')
              .addItem('Show sidebar', 'showSidebar')
              .addItem('Update All', 'upDateAll')
              .addItem('Reset Service','reset')
              .addItem('Update Shop info','shopUpdateObject')   
              .addItem('Record Shop info','getSheetInfo')   
              .addItem('Reset Object','resetShopObject')
              .addItem('Export as .csv files', 'saveAsCSV'))    
  .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e){
  onOpen(e);
}

/////////////////////////////////////////////////////////////////////////////////////////
// The disticnt Object creation for populatong Data to a sheet
/////////////////////////////////////////////////////////////////////////////////////////
/**
* the following functions generate Objects used to make the specific URLs and start the API call Squence 
*/
//////////////////////////////////
// == -- Georgetown Calls -- == \\
//////////////////////////////////
function resetSaleItems1(){
  var georgetown = recal("Georgetown") || new shopObject("Georgetown",1);
  store("Georgetown", georgetown);
  //  log("Georgetown",georgetown)
  getSalesData(georgetown,"Sale", true)
  getSaleLinesData(georgetown,"SaleLine", true);
}
function updateSaleItems1(){
  var georgetown = recal("Georgetown") || new shopObject("Georgetown",1);
  store("Georgetown", georgetown);
  //  log("Georgetown",georgetown);
  getSalesData(georgetown,"Sale", false)
  getSaleLinesData(georgetown,"SaleLine", false);
}
function updateOrderItems1(){
  var georgetown = recal("Georgetown") || new shopObject("Georgetown",1);
  store("Georgetown", georgetown); 
  //  log("Georgetown",georgetown);
  getOrderData(georgetown,"Order", true)
}

//////////////////////////////
// == -- Milton Calls -- == \\
//////////////////////////////
function resetSaleItems2(){
  var milton = recal("Milton") || new shopObject("Milton",2);
  store("Milton", milton); 
  //  log("Milton",milton);
  getSalesData(milton,"Sale", true)
  getSaleLinesData(milton,"SaleLine", true);
}
function updateSaleItems2(){
  var milton = recal("Milton") || new shopObject("Milton",2);
  store("Milton", milton); 
  //  log("Milton",milton);
  getSalesData(milton,"Sale", false)
  getSaleLinesData(milton,"SaleLine", false);
}
function updateOrderItems2(){
  var milton = recal("Milton") ||  new shopObject("Milton",2);
  store("Milton", milton); 
  getOrderData(milton,"Order",  true);
}

////////////////////////////////////
// == -- Five And Ten Calls -- == \\
////////////////////////////////////
function resetSaleItems3(){
  var fiveAndTen = recal("FiveAndTen") || new shopObject("FiveAndTen",3);
  store("FiveAndTen", fiveAndTen); 
  //  log("FiveAndTen",fiveAndTen);
  getSalesData(fiveAndTen,"Sale", true)
  log("before get Sale line Data",fiveAndTen);
  getSaleLinesData(fiveAndTen,"SaleLine", true);
}
function updateSaleItems3(){
  var fiveAndTen = recal("FiveAndTen") || new shopObject("FiveAndTen",3);
  store("FiveAndTen", fiveAndTen); 
  //  log("FiveAndTen",fiveAndTen);
  getSalesData(fiveAndTen,"Sale", false)
  log("before get Sale line Data",fiveAndTen);
  getSaleLinesData(fiveAndTen,"SaleLine", false);
}
function updateOrderItems3(){
  var fiveAndTen = recal("FiveAndTen") || new shopObject("FiveAndTen",3);
  store("FiveAndTen", fiveAndTen); 
  //  log("FiveAndTen",fiveAndTen);
  getOrderData(fiveAndTen,"Order", true)
}
 
///////////////////////////////
// == -- Fergus Calls -- == \\
///////////////////////////////
function resetSaleItems4(){
  var fergus = recal("Fergus") || new shopObject("Fergus",4);
  store("Fergus", fergus); 
//  log("fergus",fergus);
  getSalesData(fergus,"Sale", true);
  getSaleLinesData(fergus,"SaleLine", true);
}
function updateSaleItems4(){
  var fergus = recal("Fergus") ||  new shopObject("Fergus",4);
  store("Fergus", fergus); 
//  log("fergus",fergus);
  getSalesData(fergus,"Sale", false);
//  log("before get Sale line Data",fergus);
  getSaleLinesData(fergus,"SaleLine", false);
}
  function updateOrderItems4(){
  var fergus = recal("Fergus") ||  new shopObject("Fergus",4);
  store("Fergus", fergus); 
//  log("fergus",fergus);
//  getOrderData(fergus,"Order", true);
//  getOrderDetails(fergus,"OrderLine", true);
}

////////////////////////////////
// == -- Brampton Calls -- == \\
////////////////////////////////
function resetSaleItems5(){
  var brampton = recal("Brampton") || new shopObject("Brampton",5);
  store("Brampton",brampton); 
  //  log("Branpton",brampton);
  getSalesData(brampton,"Sale", true);
  getSaleLinesData(brampton,"SaleLine", true);
}
function updateSaleItems5(){
  var brampton = recal("Brampton") || new shopObject("Brampton",5);
  store("Brampton", brampton); 
  //  log("Branpton",brampton);
  getSalesData(brampton,"Sale", false);
  getSaleLinesData(brampton,"SaleLine", false);
}
function updateOrderItems5(){
  var brampton = recal("Brampton") || new shopObject("Brampton",5);
  store("Brampton", brampton); 
  getOrderData(brampton,"Order", true);
}
/////////////////////////////
// == -- Dixie Calls -- == \\
/////////////////////////////
function resetSaleItems6(){
  var dixie = recal("Dixie") || new shopObject("Dixie",6);
  store("Dixie", dixie); 
  //  log("Dixie",dixie);
  getSalesData(dixie,"Sale", true)
  getSaleLinesData(dixie,"SaleLine", true);
}
function updateSaleItems6(){
  var dixie = recal("Dixie") || new shopObject("Dixie",6);
  store("Dixie", dixie); 
  //  log("Dixie",dixie);
  getSalesData(dixie,"Sale", false)
  getSaleLinesData(dixie,"SaleLine", false);
}
function updateOrderItems6(){
  var dixie = recal("Dixie") || new shopObject("Dixie",6);
  store("Dixie", dixie); 
  //  log("Dixie",dixie);
  getOrderData(dixie,"Order", true)
}

//////////////////////////////
// == -- Dundas Calls -- == \\
//////////////////////////////
function resetSaleItems7(){
  var dundas = recal("Dundas")|| new shopObject("Dundas",7);
  store("Dundas", dundas); 
  //  log("Dundas",dundas);
  getSalesData(dundas,"Sale", true);
  getSaleLinesData(dundas,"SaleLine", true);
}
function updateSaleItems7(){
  var dundas = recal("Dundas") || new shopObject("Dundas",7);
  store("Dundas", dundas); 
  //  log("Dundas",dundas);
  getSalesData(dundas,"Sale", false);
  getSaleLinesData(dundas,"SaleLine", false);
}
function updateOrderItems7(){
  var dundas = recal("Dundas") || new shopObject("Dundas",7);
  store("Dundas", dundas); 
  //  log("Dundas",dundas);
  getOrderData(dundas,"Order", true);
}


////////////////////////////////
// == -- Employee Calls -- == \\
////////////////////////////////
function employeeData(){
  var people = new employee(false);
  getEmployeeData(people,"Employee",true)
}

