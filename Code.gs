
// add custom menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom DragonLight Menu')
  .addItem('Get Me My Data','getMeTheData')
  .addItem('Get rate quota','getDragonLightLimit')
  .addItem('Reset Service','reset')
  .addToUi();
}

// Reset The Auth Service
function reset() {
  getDragonLight().reset();}
// Account ID 166467

function getMeTheData() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActive();
  var s = ss.getSheets()[0];
  var sheetname = ss.getRangeByName('SHEET_NAME').getValues();
  var repoRange = s.getRange(3, 2);
  var service = getDragonLight();
  if (service.hasAccess()) {
    Logger.log("App has access.");
    var apiBase = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("API_URL").getValue();
    
    Logger.log(apiBase)
    
    var response = UrlFetchApp.fetch(apiBase,{
      headers : {
        muteHttpExceptions: true,
        Authorization: 'Bearer ' + service.getAccessToken(),
        Accept: 'application/json'
      }
    });
    
    var dataAll = JSON.parse(response.getContentText());
    var data = dataAll.SaleLine.items ;
    for (i in data){
      data[i].pubDate = new Date(data[i].pubDate);
      data[i].start = data[i].pubDate;
    }
    Logger.log(data);
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    if (!doc.getSheetByName(sheetname)){
      console.log("App has no access yet.");    
      var result =  SpreadsheetApp.getUi().alert("you don't have a sheet named "+ sheetname);
      } else {
        var sheet = doc.getSheetByName(sheetname);
        sheet.getRange(2, 1, sheet.getLastRow(), sheet.getMaxColumns()).clear({contentsOnly:true});
      }
    insertData(sheet,data);
    Logger.log(JSON.stringify(result, null, 2));
  }
  else {
    
    console.log("App has no access yet.");
    
    var authorizationUrl = service.getAuthorizationUrl();
    var result =  SpreadsheetApp.getUi().alert(
    "Authorize Lightspeed",
    "Click OK to see the link to copy and paste in to your browser to authorize the app", 
    ui.ButtonSet.OK_CANCEL);
     if (result == ui.Button.OK) {
    // User clicked "Yes".
    ui.alert(authorizationUrl);
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Permission denied.');
  }
    
    Logger.log('Open the following URL and re-run the script: %s',authorizationUrl);
  }
}
 
 ///////////////////////////////////////////////////////////////////////////
 // map to a spread sheet
 //////////////////////////////////////////////////////////////////////////
 function insertData(sheet, data){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (data.length>0){
    ss.toast("Inserting "+data.length+" rows");
    sheet.insertRowsAfter(1, data.length);
    setRowsData(sheet, data);
  } else {
    ss.toast("All done");
  }  
}
/*
function insertData(sheet,data){ 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var name = ss.getRangeByName('SHEET_NAME').getValues();
  var sheet = ss.getSheetByName(name);
  var headers = sheet.getRange(1, 1, 1,sheet.getLastColumn()).getValues();
  var dataSet = result.value.items;
  var rows = [],
      data;  
  
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    rows.push([data.id, data.name,data.email]); //your JSON entities here
  }
  
  dataRange = sheet.getRange(1, 1, rows.length, 3); // 3 Denotes total number of entites
  dataRange.setValues(rows);
  
}
*/
/***************************************/
// Get Rate limit
function getDragonLightLimit() {
  // set up the service
  var service = getDragonLight();
  
  if (service.hasAccess()) {
    Logger.log("App has access.");
    
    var api = "https://api.lightspeedapp.com/API/Account.json";
    
    var headers = {
        'Authorization': 'Bearer ' + service.getAccessToken(),
        'muteHttpExceptions': true,
        'Accept': 'application/json'
    };
    
    var options = {
      "headers": headers,
      "method" : "GET",
      "muteHttpExceptions": true
    };
    
    var response = UrlFetchApp.fetch(api, options);
    var responseCode = response.getResponseCode();
    
    console.log(responseCode);
    var json = JSON.parse(response.getContentText());
    console.log("You have " + json.rate.remaining + " requests left this hour.");
    
  }
  else {
    console.log("App has no access yet.");
    
    // open this url to gain authorization from github
    var authorizationUrl = service.getAuthorizationUrl();
  
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
        }
}
/*
{SaleLine=[
{calcTotal=107.3387, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=0, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=5, itemID=989, tax2Rate=0.08, avgCost=0, discountID=1, saleLineID=1, parentSaleLineID=0, taxCategoryID=1, unitPrice=99.99, calcSubtotal=99.99, discountPercent=0.05, saleID=4, TaxCategory={tax1Name=Sales Tax, timeStamp=2018-05-10T04:03:55+00:00, tax1Rate=0.08, tax2Rate=0.05, isTaxInclusive=false, tax2Name=, taxCategoryID=1}, isLayaway=false, tax=true, calcTax2=7.5992, calcTax1=4.7495, displayableUnitPrice=94.99, timeStamp=2018-03-14T18:44:58+00:00, displayableSubtotal=94.99, taxClassID=1, createTime=2018-03-14T18:44:58+00:00, unitQuantity=1, normalUnitPrice=99.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=56.4887, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=25, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0, itemID=947, tax2Rate=0.08, avgCost=25, discountID=0, saleLineID=2, parentSaleLineID=0, taxCategoryID=1, unitPrice=49.99, calcSubtotal=49.99, discountPercent=0, saleID=7, isLayaway=false, tax=true, calcTax2=3.9992, calcTax1=2.4995, displayableUnitPrice=47.49, timeStamp=2018-03-16T13:06:59+00:00, displayableSubtotal=49.99, taxClassID=1, createTime=2018-03-16T12:59:29+00:00, unitQuantity=1, normalUnitPrice=49.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=56.4887, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=25, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0, itemID=946, tax2Rate=0.08, avgCost=25, discountID=0, saleLineID=3, parentSaleLineID=0, taxCategoryID=1, unitPrice=49.99, calcSubtotal=49.99, discountPercent=0, saleID=7, isLayaway=false, tax=true, calcTax2=3.9992, calcTax1=2.4995, displayableUnitPrice=47.49, timeStamp=2018-03-16T13:06:58+00:00, displayableSubtotal=49.99, taxClassID=1, createTime=2018-03-16T12:59:38+00:00, unitQuantity=1, normalUnitPrice=49.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=27.1087, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=12, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0, itemID=593, tax2Rate=0.08, avgCost=12, discountID=0, saleLineID=4, parentSaleLineID=0, taxCategoryID=1, unitPrice=23.99, calcSubtotal=23.99, discountPercent=0, saleID=7, isLayaway=false, tax=true, calcTax2=1.9192, calcTax1=1.1995, displayableUnitPrice=22.79, timeStamp=2018-03-16T13:06:58+00:00, displayableSubtotal=23.99, taxClassID=1, createTime=2018-03-16T13:00:14+00:00, unitQuantity=1, normalUnitPrice=23.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=54.2174, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=12, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0, itemID=592, tax2Rate=0.08, avgCost=12, discountID=0, saleLineID=5, parentSaleLineID=0, taxCategoryID=1, unitPrice=23.99, calcSubtotal=47.98, discountPercent=0, saleID=7, isLayaway=false, tax=true, calcTax2=3.8384, calcTax1=2.399, displayableUnitPrice=22.79, timeStamp=2018-03-16T13:06:58+00:00, displayableSubtotal=47.98, taxClassID=1, createTime=2018-03-16T13:00:15+00:00, unitQuantity=2, normalUnitPrice=23.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=27.1087, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=12, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0, itemID=591, tax2Rate=0.08, avgCost=12, discountID=0, saleLineID=6, parentSaleLineID=0, taxCategoryID=1, unitPrice=23.99, calcSubtotal=23.99, discountPercent=0, saleID=7, isLayaway=false, tax=true, calcTax2=1.9192, calcTax1=1.1995, displayableUnitPrice=22.79, timeStamp=2018-03-16T13:06:58+00:00, displayableSubtotal=23.99, taxClassID=1, createTime=2018-03-16T13:00:15+00:00, unitQuantity=1, normalUnitPrice=23.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
      {calcTotal=0, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=0,  employeeID=2, noteID=1366, isWorkorder=false, calcLineDiscount=0, itemID=0, tax2Rate=0.08, avgCost=0, discountID=0, saleLineID=7, parentSaleLineID=0, taxCategoryID=1, unitPrice=0, calcSubtotal=0, discountPercent=0, saleID=7, TaxCategory={tax1Name=Sales Tax, timeStamp=2018-05-10T04:03:55+00:00, tax1Rate=0.08, tax2Rate=0.05, isTaxInclusive=false, tax2Name=, taxCategoryID=1}, isLayaway=false, tax=false, calcTax2=0, calcTax1=0, displayableUnitPrice=0, timeStamp=2018-03-16T13:05:27+00:00, displayableSubtotal=0, taxClassID=3, createTime=2018-03-16T13:01:07+00:00, unitQuantity=1, normalUnitPrice=0, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=16.0912, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=7.5, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0.75, itemID=153, tax2Rate=0.08, avgCost=7.5, discountID=1, saleLineID=8, parentSaleLineID=0, taxCategoryID=1, unitPrice=14.99, calcSubtotal=14.99, discountPercent=0.05, saleID=8, TaxCategory={tax1Name=Sales Tax, timeStamp=2018-05-10T04:03:55+00:00, tax1Rate=0.08, tax2Rate=0.05, isTaxInclusive=false, tax2Name=, taxCategoryID=1}, isLayaway=false, tax=true, calcTax2=1.1392, calcTax1=0.712, displayableUnitPrice=14.24, timeStamp=2018-03-17T01:54:56+00:00, displayableSubtotal=14.24, taxClassID=1, createTime=2018-03-17T01:53:12+00:00, unitQuantity=1, normalUnitPrice=14.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=16.0912, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=7.5, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0.75, itemID=152, tax2Rate=0.08, avgCost=7.5, discountID=1, saleLineID=9, parentSaleLineID=0, taxCategoryID=1, unitPrice=14.99, calcSubtotal=14.99, discountPercent=0.05, saleID=8, TaxCategory={tax1Name=Sales Tax, timeStamp=2018-05-10T04:03:55+00:00, tax1Rate=0.08, tax2Rate=0.05, isTaxInclusive=false, tax2Name=, taxCategoryID=1}, isLayaway=false, tax=true, calcTax2=1.1392, calcTax1=0.712, displayableUnitPrice=14.24, timeStamp=2018-03-17T01:54:56+00:00, displayableSubtotal=14.24, taxClassID=1, createTime=2018-03-17T01:53:13+00:00, unitQuantity=1, normalUnitPrice=14.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=16.0912, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=7.5, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0.75, itemID=62, tax2Rate=0.08, avgCost=7.5, discountID=1, saleLineID=10, parentSaleLineID=0, taxCategoryID=1, unitPrice=14.99, calcSubtotal=14.99, discountPercent=0.05, saleID=8, TaxCategory={tax1Name=Sales Tax, timeStamp=2018-05-10T04:03:55+00:00, tax1Rate=0.08, tax2Rate=0.05, isTaxInclusive=false, tax2Name=, taxCategoryID=1}, isLayaway=false, tax=true, calcTax2=1.1392, calcTax1=0.712, displayableUnitPrice=14.24, timeStamp=2018-03-17T01:54:56+00:00, displayableSubtotal=14.24, taxClassID=1, createTime=2018-03-17T01:53:24+00:00, unitQuantity=1, normalUnitPrice=14.99, customerID=0, shopID=1, calcTransactionDiscount=0}, 
{calcTotal=16.0912, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=7.5, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=0.75, itemID=61, tax2Rate=0.08, avgCost=7.5, discountID=1, saleLineID=11, parentSaleLineID=0, taxCategoryID=1, unitPrice=14.99, calcSubtotal=14.99, discountPercent=0.05, saleID=8, TaxCategory={tax1Name=Sales Tax, timeStamp=2018-05-10T04:03:55+00:00, tax1Rate=0.08, tax2Rate=0.05, isTaxInclusive=false, tax2Name=, taxCategoryID=1}, isLayaway=false, tax=true, calcTax2=1.1392, calcTax1=0.712, displayableUnitPrice=14.24, timeStamp=2018-03-17T01:54:56+00:00, displayableSubtotal=14.24, taxClassID=1, createTime=2018-03-17T01:53:25+00:00, unitQuantity=1, normalUnitPrice=14.99, customerID=0, shopID=1, calcTransactionDiscount=0},
{calcTotal=42.9287, isSpecialOrder=false, tax1Rate=0.05, discountAmount=0, fifoCost=20, employeeID=2, noteID=0, isWorkorder=false, calcLineDiscount=2, itemID=916, tax2Rate=0.08, avgCost=20, discountID=1, saleLineID=12, parentSaleLineID=0, taxCategoryID=1, unitPrice=39.99, calcSubtotal=39.99, discountPercent=0.05, saleID=8, TaxCategory={tax1Name=Sales Tax, timeStamp=2018-05-10T04:03:55+00:00, tax1Rate=0.08, tax2Rate=0.05, isTaxInclusive=false, tax2Name=, taxCategoryID=1}, isLayaway=false, ta
*/