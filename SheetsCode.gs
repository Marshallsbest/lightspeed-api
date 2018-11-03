// == -- Date : get the Week number according to ISO See notes for Attribution -- == \\
// This portion of the script (Date.getWeek) is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript

Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}


//////////////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// == -- Micro Funcitons designed to be used by multiple processes -- == \\
//////////////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// == -- Change the strings returned in to date objects for the Spreadsheet to recognize properly -- == \\
function fixDates(dataRow){
  if(dataRow.orderedDate){
    var orDate = new Date(dataRow.orderedDate).toJSON();
    dataRow.orderedDate = new Date(orDate);
  };
  if(dataRow.receivedDate){
    var reDate = new Date(dataRow.receivedDate).toJSON();
    dataRow.receivedDate = new Date(reDate);
  };
  if(dataRow.timeStamp){
    var tsDate = new Date(dataRow.timeStamp).toJSON();
    dataRow.timeStamp = new Date(tsDate);
  };
  if(dataRow.createTime){
    var crDate = new Date(dataRow.createTime).toJSON();
    dataRow.createTime = new Date(crDate);
  };
  if(dataRow.updateTime){
    var upDate = new Date(dataRow.updateTime).toJSON();
    dataRow.updateTime = new Date(upDate);
  };
  if(dataRow.dob){
    var dbDate = new Date(dataRow.dob).toJSON();
    dataRow.dob = new Date(dbDate);
  };
  if(dataRow.arrivalDate){
    var arDate = new Date(dataRow.arrivalDate).toJSON();
    dataRow.arrivalDate = new Date(arDate);
  };
  if(dataRow.completeTime){
    var cpDate = new Date(dataRow.completeTime).toJSON();
    dataRow.completeTime = new Date(cpDate);
    
    dataRow.createWeek = dataRow.createTime;  
  };
  if(dataRow.createWeek){
    var cwDate = new Date(dataRow.completeTime).toJSON();
    var week = new Date(cwDate);
    var weekNum = week.getWeek();
    dataRow.createWeek = weekNum;
  };
  dataRow.createDay = dataRow.createTime;
  dataRow.createMonth = dataRow.createTime;
  dataRow.time = dataRow.createTime;
  return dataRow
};


/////////////////////////////////////////////////////////////////////////
// Clear Date Sheet
////////////////////////////////////////////////////////////////////////
function clearSheet(headerRows, sheet){
  if(sheet.getFrozenRows()>0){
    headerRows = sheet.getFrozenRows()
    sheet.getRange(headerRows+1, 1, sheet.getLastRow(), sheet.getMaxColumns()).clear({contentsOnly:true});
    return sheet
  }
};

function resetSaleItems4(){
  var fergus = new franchisee("Fergus",4);
  getSalesData(fergus,"Sale", true)
}
////////////////////////////////////////////////////////////////////////////////////
// This Assigns the item description, category and qty to the corresponding columns 
////////////////////////////////////////////////////////////////////////////////////
function fixItems(dataRow){
  try{ 
    var saleItemQty=0;
    var sLine = dataRow.SaleLines.SaleLine;
    if(Array.isArray(sLine)){
      for(var j = 0; j<sLine.length; j++){
        var desc = 'LineItemDesc'+j;
        var qty = 'LineItemQty'+j;
        var cat = 'LineItemCat'+j;
        dataRow[desc] = sLine[j].Item.description;
        dataRow[qty] = sLine[j].unitQuantity;
        dataRow[cat] = sLine[j].Item.categoryID;
        saleItemQty = Number(saleItemQty)+Number(sLine[j].unitQuantity);
      };
    }else {
      dataRow.LineItemDesc0 = sLine.Item.description;
      dataRow.LineItemQty0 = sLine.unitQuantity;
      dataRow.LineItemCat0 = sLine.Item.categoryID;
      saleItemQty = Number(saleItemQty) + Number(sLine.unitQuantity);
    }
    dataRow.SaleItemQty = saleItemQty;
    dataRow.HST = Number(dataRow.tax1Rate)+Number(dataRow.tax2Rate);
    dataRow.calcTax = Number(dataRow.calcTax1)+Number(dataRow.calcTax2);
  }
  catch(error){
    console.log(error)
    ////console.log(this)
  }
  return dataRow;
  
}



///////////////////////////////////////////////////////////////////////////////////////
// Gets All sale ID tags and finds the largest in hte column
///////////////////////////////////////////////////////////////////////////////////////
function getCurrentSaleID(sheetName,ssID){
  
  var ss = SpreadsheetApp.openById(ssID);
  var sheet = ss.getSheetByName(sheetName);
  var headers = sheet.getRange(1,1,1,ss.getLastColumn()).getValues();
  var colIndex = headers[0].indexOf("saleID")+1;
  var column = sheet.getRange(2, colIndex,sheet.getLastRow()).getValues().sort(function(a, b){return a-b}).pop();
  var saleID = Math.max.apply(null, column);
  log("returned Sale ID from the Get Sale ID Function",saleID);
  return saleID
  
}

function callApi(apiUrl,service, type){
  var headers = {
    "Authorization": 'Bearer ' + service.getAccessToken(),  
    "Accept": 'application/json'
  };
  var options = {
    "headers": headers,
    "method" : type,
    "muteHttpExceptions": true
  };
  
  // == -- Make The Call to Light Speed -- == \\
  var response = UrlFetchApp.fetch(apiUrl,options);
  return response
}
///////////////////////////////////////////////////////////////////////////////////////
// Set Column Formating 
///////////////////////////////////////////////////////////////////////////////////////
function formatColumns(sheet){
  var s = sheet;
  var headers = s.getRange(1,1,1,s.getLastColumn()).getValues();
  var colIndex = headers[0].indexOf("createDay")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("DDDD");
  var colIndex = headers[0].indexOf("createMonth")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("MMMM");
  var colIndex = headers[0].indexOf("createTime")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("yyyy-MM-dd");
  var colIndex = headers[0].indexOf("createWeek")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("###");
  var colIndex = headers[0].indexOf("time")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("HH:mm:ss");
  var colIndex = headers[0].indexOf("HST")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("##%");
  var colIndex = headers[0].indexOf("calcDiscount")+1;
  var column = s.getRange(2, colIndex,s.getLastRow(),10).setNumberFormat("$#,##0.00");
  
  
}

/**
* Opens a sidebar. The sidebar structure is described in the Sidebar.html
* project file.
*/
function showSidebar(){
  var SIDEBAR_TITLE = 'Lightspeed Integration';
  var ui = HtmlService.createTemplateFromFile('Sidebar')
  .evaluate()
  .setTitle(SIDEBAR_TITLE)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  //  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
* Opens a dialog. The dialog structure is described in the Dialog.html
* project file.
*/
function showDialog() {
  var DIALOG_TITLE = 'Authenticate Lightspeed';
  var ui = HtmlService.createTemplateFromFile('Dialog')
  .evaluate()
  .setWidth(400)
  .setHeight(190)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  //  SpreadsheetApp.getUi().showModalDialog(ui, DIALOG_TITLE);
}

/**
* Returns the value in the active cell.
*
* @return {String} The value of the active cell.
*/
function getActiveValue() {
  // Retrieve and return the information requested by the sidebar.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  return cell.getValue();
}

/**
* Replaces the active cell value with the given value.
*
* @param {Number} value A reference number to replace with.
*/
function setActiveID(info) {
  var shopID = info;
  var prompt = "Getting Saved Shop Object Info: "+shopID;
  ////console.log("Shop ID", shopID)
  // Use data collected from sidebar to manipulate the sheet.
  var cell = SpreadsheetApp.getUi().alert(prompt);
  var create
  var msg = "shop ID Set to " + cell.getValue();
  return 
}

function setActiveSheet(sheet) {
  //console.log("value", sheet)
  // Use data collected from sidebar to manipulate the sheet.
  var setSheet = SpreadsheetApp.getActive().getSheetByName(sheet).showSheet().activate();
  getMeTheData();
  var msg = "API Called";
  return 
}

/**
* Executes the specified action (create a new sheet, copy the active sheet, or
* clear the current sheet).
*
* @param {String} action An identifier for the action to take.
*/
function modifySheets(action) {
  // Use data collected from dialog to manipulate the spreadsheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var currentSheet = ss.getActiveSheet();
  if (action == 'create') {
    ss.insertSheet();
  } else if (action == 'copy') {
    currentSheet.copyTo(ss);
  } else if (action == 'clear') {
    currentSheet.clear();
  }
}