
// add custom menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom DragonLight Menu')
  .addItem('Get Me My Data','getMeTheData')
  .addItem('Open Side Bar','getSideBar')
  .addItem('Reset Service','reset')
  .addToUi();
var user = Session.getEffectiveUser().getEmail();
var scriptProperties = PropertiesService.getScriptProperties();
var scope = scriptProperties.getProperty(user);  
 setScope(scope);
}

function getSideBar(){


}
function setScope(scope){
var results = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("SHOPTABLE");
var shopTable = results.getDisplayValues();
results.forEach(function(shop,scope){

    switch(shop[1]){
      case '1':               
        array.push([shop[0],scope]);                
        break;
      case '2':
        array.push([row[0],"FR"]);
        array.push([row[0],"DE"]);
        break;
      case '3':
        array.push([row[0],"UK"]);
        array.push([row[0],"SW"]);
        break;
    }
  });
  shopTable[i].setValue(scope);
 Logger.log(shopTable)
}



// Reset The Auth Service
function reset() {
  getDragonLight().reset();}



// Get The Shop Data 
function getMeTheData() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActive();
  var s = ss.getSheets();
  var dataSheet = s[0];
//  var sheetName = ss.getRangeByName('SHEET_NAME').getValues();
  var repoRange = dataSheet.getRange(3, 2);
  var service = getDragonLight();
  if (service.hasAccess()) {

    var sheet = ss.getActiveSheet();
    var sheetName = sheet.getSheetName(); 
    var url = ss.getRangeByName(sheetName).getValue();
    Logger.log(url);
    var headers = {
       "Authorization": 'Bearer ' + service.getAccessToken(),  
       "Accept": 'application/json'
        };
    var options = {
      "headers": headers,
      "method" : "GET",
      "muteHttpExceptions": true
    };
    var response = UrlFetchApp.fetch(url,options);
    var json = response.getContentText();
    Logger.log(json);
    var dataAll = JSON.parse(json);
    Logger.log(dataAll)
    var names = Object.getOwnPropertyNames(dataAll);
    var data = dataAll[sheetName];
    
    if (!ss.getSheetByName(sheetName)){
      var result = ui.alert("you don't have a sheet named "+ sheetName);
      } else {
        var headerRows = 1 ;
        if(sheet.getFrozenRows()>1){
        headerRows = sheet.getFrozenRows()
        }
        sheet.getRange(headerRows+1, 1, sheet.getLastRow(), sheet.getMaxColumns()).clear({contentsOnly:true});
      }
    insertData(sheet,data);
   }
  else {
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

function  insertData(sheet,data){;// Logger.log("INSERT THIS DATA",data);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

if (data.length>0){
    ss.toast("Inserting "+data.length+" rows");
//    sheet.insertRowsAfter(1, data.length);
    setRowsData(sheet, data);
  } else {
    ss.toast("Data Not Defined! Nothing to be Written to Sheet");
  }  
}
// setRowsData fills in one row of data per object defined in the objects Array.
// For every Column, it checks if data objects define a value for it.
// Arguments:
//   - sheet: the Sheet Object where the data will be written
//   - objects: an Array of Objects, each of which contains data for a row
//   - optHeadersRange: a Range of cells where the column headers are defined. This
//     defaults to the entire first row in sheet.
//   - optFirstDataRowIndex: index of the first row where data should be written. This
//     defaults to the row immediately below the headers.
function setRowsData(sheet, objects, optHeadersRange, optFirstDataRowIndex) {
  var headersRange = optHeadersRange || sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var firstDataRowIndex = optFirstDataRowIndex || sheet.getLastRow()+1;
  var headers = headersRange.getValues()[0];
  //  Logger.log("Headers ARE HERE",headers)
  //  Logger.log("setRowsData Called")
  var dataSet = [];
  for (var i = 0; i < objects.length; ++i) {
    var values = []
    for (j = 0; j < headers.length; ++j) {
      var header = headers[j];
      //      Logger.log(header);
      values.push(header.length > 0 && objects[i][header] ? objects[i][header] : "");
    }
    console.log(values);
    dataSet.push(values);
    //    Logger.log("dataSet IS HERE",dataSet)
  }
  var destinationRange = sheet.getRange(firstDataRowIndex, headersRange.getColumnIndex(), 
                                        objects.length, headers.length);
  destinationRange.setValues(dataSet);
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