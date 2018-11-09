///////////////////////////////////////////////////////////////
//  ad custom menu when the spread sheet opens
///////////////////////////////////////////////////////////////
var UIONOFF = true;
var LOGSALES = false; // Enables Sales Logs
var LOGSDATA = false; // Enables Sheet Logs
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
  .addSubMenu(ui.createMenu('5&10')
              .addItem('Update Data', 'updateSaleItems3')
              .addItem('Reload Data', 'resetSaleItems3'))
  .addSeparator()
  .addSubMenu(ui.createMenu('Georgetown')
              .addItem('Update Data', 'updateSaleItems1')
              .addItem('Reload Data', 'resetSaleItems1')) 
  .addSeparator()
  .addSubMenu(ui.createMenu('Fergus')
              .addItem('Update Data', 'updateSaleItems4')
              .addItem('Reload Data', 'resetSaleItems4'))  
  .addSeparator()
  .addSubMenu(ui.createMenu('Milton')
              .addItem('Update Data', 'updateSaleItems2')
              .addItem('Reload Data', 'resetSaleItems2'))  
  .addSeparator()
  .addSubMenu(ui.createMenu('Dixie')
              .addItem('Update Data', 'updateSaleItems6')
              .addItem('Reload Data', 'resetSaleItems6'))
  .addSeparator()
  .addSubMenu(ui.createMenu('Brampton')
              .addItem('Update Data', 'updateSaleItems5')
              .addItem('Reload Data', 'resetSaleItems5')) 
  .addSeparator()
  .addSubMenu(ui.createMenu('Dundas')
              .addItem('Update Data', 'updateSaleItems7')
              .addItem('Reload Data', 'resetSaleItems7'))  
  .addSeparator()
  .addSubMenu(ui.createMenu('Employee')
              .addItem('Refresh Data', 'employeeData'))
  .addSubMenu(ui.createMenu('Admin')
              .addItem('Show sidebar', 'showSidebar')
              .addItem('Update All', 'upDateAll')
              .addItem('Reset Service','reset')
              .addItem('Update Shop info','shopUpdateObject')   
              .addItem('Reset Object','resetShopObject'))    
  .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}



/////////////////////////////////////////////////////////////////////////////////////////
// The disticnt Object creation for populatong Data to a sheet
/////////////////////////////////////////////////////////////////////////////////////////
/**
* the following functions generate Objects used to make the specific URLs and start the API call Squence 
*/

function resetSaleItems5(){
  var brampton = recal("Brampton") || new shopObject("Brampton",5);
  store("Brampton",brampton); 
//  log("Branpton",brampton);
  getSalesData(brampton,"Sale", true)
}
function updateSaleItems5(){
  var brampton = recal("Brampton") || new shopObject("Brampton",5);
  store("Brampton", brampton); 
//  log("Branpton",brampton);
  getSalesData(brampton,"Sale", false)
}
function resetSaleItems7(){
  var dundas = recal("Dundas")|| new shopObject("Dundas",7);
  store("Dundas", dundas); 
//  log("Dundas",dundas);
  getSalesData(dundas,"Sale", true);
  getSaleLinesData(dundas,"SaleLines", true);
}
function updateSaleItems7(){
  var dundas = recal("Dundas") || new shopObject("Dundas",7);
  store("Dundas", dundas); 
//  log("Dundas",dundas);
  getSalesData(dundas,"Sale", false);
  getSaleLinesData(dundas,"SaleLines", false);
}
function resetSaleItems6(){
  var dixie = recal("Dixie") || new shopObject("Dixie",6);
  store("Dixie", dixie); 
//  log("Dixie",dixie);
  getSalesData(dixie,"Sale", true)
}
function updateSaleItems6(){
  var dixie = recal("Dixie") || new shopObject("Dixie",6);
  store("Dixie", dixie); 
//  log("Dixie",dixie);
  getSalesData(dixie,"Sale", false)
}
function resetSaleItems4(){
  var fergus = recal("Fergus") || new shopObject("Fergus",4);
  store("Fergus", fergus); 
  log("fergus",fergus);
  getSalesData(fergus,"Sale", true);
//  getSaleLinesData(fergus,"SaleLines", true);
}
function updateSaleItems4(){
  var fergus = recal("Fergus") ||  new shopObject("Fergus",4);
  store("Fergus", fergus); 
  log("fergus",fergus);
  getSalesData(fergus,"Sale", false);
  log("before get Sale line Data",fergus);
  getSaleLinesData(fergus,"SaleLine", false);
}
function resetSaleItems2(){
  var milton = recal("Milton") || new shopObject("Milton",2);
  store("Milton", milton); 
//  log("Milton",milton);
  getSalesData(milton,"Sale", true)
}
function updateSaleItems2(){
  var milton = recal("Milton") || new shopObject("Milton",2);
  store("Milton", milton); 
//  log("Milton",milton);
  getSalesData(milton,"Sale", false)
}
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
function resetSaleItems1(){
  var georgetown = recal("Georgetown") || new shopObject("Georgetown",1);
  store("Georgetown", georgetown); 
//  log("Georgetown",georgetown)
  getSalesData(georgetown,"Sale", true)
}
function updateSaleItems1(){
  var georgetown = recal("Georgetown") || new shopObject("Georgetown",1);
  store("Georgetown", georgetown); 
//  log("Georgetown",georgetown);
  getSalesData(georgetown,"Sale", false)
}
function employeeData(){
  var people = new employee(false);
  getEmployeeData(people,"Employee",true)
}

