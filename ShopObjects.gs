////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// == -- Objects with spreadsheet info and url call data -- == \\
////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/**
 * Object info stored in properties retrieved from each Spreadsheet
 * @params {String} shopName - The Name of the store for use in this code
 * @params {integer} shopID - The number designation from Light Speed of the shopw
 */
function shopObject(shopName,shopId){
  this.name = shopName;
  this.lsId = shopId;
  this.salesSheetName = 'Sales_Sheet';
  this.saleLineSheetName = 'Sale_Lines';
  this.sale = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?&shopID="+shopId;
  this.sales = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?&shopID="+shopId+"&load_relations=[%22SaleLines,Item,%22]";
  this.saleLine = "https://api.lightspeedapp.com/API/Account/166476/SaleLine.json?&shopID="+shopId;
  this.orderSheetName = 'Orders_Sheet';
  this.orderLineSheetName = 'Order_Lines';
  this.orderID = 0; 
  this.orderLineID = 0;
  this.order = "https://api.lightspeedapp.com/API/Account/166476/Order.json?&shopID="+shopId;
  this.orderLine = "https://api.lightspeedapp.com/API/Account/166476/OrderLine.json?&shopID="+shopId;
  this.orderTemplates = "https://api.lightspeedapp.com/API/Account/166476/DisplayTemplate/Order.json?&shopID="+shopId;
  this.orderTemplate = "https://api.lightspeedapp.com/API/Account/166476/DisplayTemplate/Order/ORDERID.json";
  this.ID = makeNewShop(this.name);
  this.saleID = 0;
  this.saleLineID = 0;
}

/**
*
* @Params {String} shopName - the Shop object to be upodated
* @Params {Object} output - Out put an object with the needed info and methods for a particular store 
*/
function shopUpdateObject(){
  var shopName = getUserInput();
  var shop = recal(shopName);
  var shopId = shop.lsId;
  shop.salesSheetName = 'Sales_Sheet';
  this.saleLineSheetName = 'Sale_Lines';
  shop.sale = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?&shopID="+shopId;
  shop.sales = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?&shopID="+shopId+"&load_relations=[%22SaleLines.Item%22]";
  shop.saleLine = "https://api.lightspeedapp.com/API/Account/166476/SaleLine.json?&shopID="+shopId;
  shop.orderLineSheetName = 'Order_Lines';
  shop.orderSheetName = 'Orders_Sheet';
  this.orderID = this.saleID ||0; 
  this.orderLineID = this.saleID || 0;
  this.order = "https://api.lightspeedapp.com/API/Account/166476/Order.json?&shopID="+shopId;
  this.orderLine = "https://api.lightspeedapp.com/API/Account/166476/OrderLine.json?&shopID="+shopId;
  this.orderTemplates = "https://api.lightspeedapp.com/API/Account/166476/DisplayTemplate/Order.json?&shopID="+shopId;
  this.orderTemplate = "https://api.lightspeedapp.com/API/Account/166476/DisplayTemplate/Order/"+this.orderID+".json";
  this.ID = makeNewShop(this.name);
  this.saleID = this.saleID ||0;
  shop.saleLineID = this.saleLineID || 0;
  store(shopName,shop)
}

/**
* This creates a new Spreadsheet with the given shop Name
* @Params {Object} shop - the Shop object to be upodated
* @Params {Object} output - Out put an object with the needed info and methods for a particular store 
*/
function makeNewShop(shopName){
if(recal(shopName)){
  var url = recal(shopName)
  return url.ID
  }else {
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var d = DriveApp;
  var f = d.searchFolders(shopName);
  if(UIONOFF){ var t = s.toast("New Document function Called");}
  var folder = d.createFolder(shopName+" KPI Data");
  var folderID = folder.getId();
  var shopKpiName = shopName+" KPI Data";
  var ss = d.getFileById('1KYixUXtTB87UXon50P8cLVi3SVeSpzT0ogypuixCjos');
  var newSs = ss.makeCopy(shopKpiName, folder);
  if(UIONOFF){ var tf = s.toast("New Document made")+urlId;}
  var urlId = newSs.getId();
  var url = newSs.getUrl();
  if(UIONOFF){ var info = s.toast("Link Data inserted into data Sheet")+urlId;}
  if(UIONOFF){ s.toast("Before Sheet logging".urlId)};
  logSheetData(urlId,url, shopName);
  if(UIONOFF){ s.toast("Link Data inserted into data Sheet")+urlId;}
  return urlId
  }
}


/////////////////////////////////////////////////////////////////
// 
////////////////////////////////////////////////////////////////
function getSheetInfo(){
  var shopObj = getUserInput();
  var shop = recal(shopObj);
  var ID = shop.ID;
  var url = DriveApp.getFileById(ID).getUrl();
  var name = shop.name;
  logSheetData( ID, url, name)
}

/////////////////////////////////////////////////////////////////
// Write SHeet ID URL and Name to Data SHeet of MAster Spreadsheet
/////////////////////////////////////////////////////////////////
function logSheetData(urlId,url, shopName){
  var row;
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = s.getSheetByName("Data");
  var nameCol = sheet.getRange(2,1,sheet.getMaxRows(),1).getValues()
  for(var i=0;i<nameCol.length; i++)
    var shopRow = nameCol[i];
  if(shopRow == shopName){
     s.toast("Shop Name = Shop Row")
    row = i+1;
  } else {
    row = sheet.getLastRow()+1;
  }
  var nameRange = sheet.getRange(row, 1);
  var idRange = sheet.getRange(row,2);
  var urlRange = sheet.getRange(row,3);
  idRange.setValue(urlId);
  urlRange.setValue(url);
  nameRange.setValue(shopName); 
}