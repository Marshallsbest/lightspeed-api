///////////////////////////////////////////////////////////////
// Get the login email of the effective user logged in 
// ad custom menu when the spread sheet opens
///////////////////////////////////////////////////////////////

var DIALOG_TITLE = 'Authenticate Lightspeed';
var SIDEBAR_TITLE = 'Lightspeed Integration';

/**
 * Adds a custom menu with items to show the sidebar and dialog. //.createAddonMenu()
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Dragon Menu')
    .addItem('Get Me My Data','showSidebar')
    .addItem('Show sidebar', 'showSidebar')
    .addItem('Show dialog', 'showDialog')
    .addItem('Reset Service','reset')
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


/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showSidebar(){
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 *Reset The Auth Service
 */
function reset(){
  getDragonLight().reset();
  }


/**
 * Build the url from the Named Range on the API sheet 
 * coresponding to the Active sheet name
 * @params {integer} offset  the number at which the returned 100 lines begins 
 * @params {string} url call to the api
 * @params {string} endPoint the name of the end point 
 * @params {string} the type of call to make [GET, POST, PUT, DELETE]
 * @return {Object} data[] 
 */
function getData(offset,url, endPoint, type){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var service = getDragonLight();
  var data = [];
  var choice = endPoint;
  var apiUrl;
  // == -- Get OAuth Token before making the API Call -- == \\ 
  if (service.hasAccess()){
    var loop = true;
    var dataAll = [];   
  // == -- API limits returned Data to 100 lines, Loop calls till all lines are retrieved -- == \\  
    while (loop){
      if(offset <= 0){
        apiUrl =url;
      } else {
        apiUrl = url+"&offset="+offset;
      };
      // == -- Build API Headers -- == \\
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
      var responseHeaders = response.getAllHeaders();
      var obj = JSON.parse(response.getContentText());
      var objData =  Object.getOwnPropertyDescriptor(obj,choice);
      var nonSale = 0;
      for (var i = 0 ; i < objData.value.length; i++ ){
        var dataRow = objData.value[i];
        
        // == -- Check to see if Sale is completed before processing -- == \\
        if(dataRow.completed == 'false'){
        nonSale++ ;
        }else {
        
        // == -- Process the Date fields to return proper Date Objects -- == \\ 
        fixDates(dataRow);
        
        // == -- Find and seperate Sale Item Info -- == \\ 
          fixItems(dataRow);
        dataAll.push(dataRow); // <- recursive call
        }
      }
     
     // == -- Check and make repeat calls with offset to get all the needed Data -- == \\
      var curCount = dataAll.length + nonSale;
      var dataCounts = Object.getOwnPropertyDescriptor(obj, "@attributes");
//      var dataOffSet = Number(dataCounts.value.offset);
      var count = Number(dataCounts.value.count);
      var limit = Number(dataCounts.value.limit||100);
      
      if(count > curCount){
        offset = curCount; 
        ss.toast("Current Number of rows processed ="+offset+" of "+count);
      } else {
        loop = false
      };
    };
  } else {
    // == -- Throw up an alert box to get the user the authorization dialog url -- == \\
    reAuth(service)
  }
  console.log("After data push",dataAll);
  return dataAll;
}

  /**
  * the following functions generate the User Objects and start the API call Squence 
  */
  
  function resetSaleItems5(){
    var brampton = new franchisee("Brampton",5);
    getSalesData(brampton,"Sale", true)
  }
  function updateSaleItems5(){
    var brampton = new franchisee("Brampton",5);
    getSalesData(brampton,"Sale", false)
  }
  function resetSaleItems7(){
    var dundas = new franchisee("Dundas",7);
    getSalesData(dundas,"Sale", true)
  }
  function updateSaleItems7(){
    var dundas = new franchisee("Dundas",7);
    getSalesData(dundas,"Sale", false)
  }
  function resetSaleItems6(){
    var dixie = new franchisee("Dixie",6);
    getSalesData(dixie,"Sale", true)
  }
  function updateSaleItems6(){
    var dixie = new franchisee("Dixie",6);
    getSalesData(dixie,"Sale", false)
  }
  function resetSaleItems4(){
    var fergus = new franchisee("Fergus",4);
    getSalesData(fergus,"Sale", true)
  }
  function updateSaleItems4(){
    var fergus = new franchisee("Fergus",4);
    getSalesData(fergus,"Sale", false)
  }
  function resetSaleItems2(){
    var milton = new franchisee("Milton",2);
    getSalesData(milton,"Sale", true)
  }
  function updateSaleItems2(){
    var milton = new franchisee("Milton",2);
    getSalesData(milton,"Sale", false)
  }
  function resetSaleItems3(){
    var imran = new franchisee("FiveAndTen",3);
    getSalesData(imran,"Sale", true)
  }
  function updateSaleItems3(){
    var imran = new franchisee("FiveAndTen",3);
    getSalesData(imran,"Sale", false)
  }
  function resetSaleItems1(){
    var georgetown = new franchisee("Georgetown",1);
    getSalesData(georgetown,"Sale", true)
  }
  function updateSaleItems1(){
    var georgetown = new franchisee("Georgetown",1);
    getSalesData(georgetown,"Sale", false)
  }
////////////////////////////////////////////////////////////////////////////////////////
// == -- The Main Function Called for retrieving the Data from teh API -- == \\ 
////////////////////////////////////////////////////////////////////////////////////////

/**
 * Main Function Call 
 * @param Object - Franchisee object to be passed in 
 * @Param String - name of the main End point to be called
 * @Param Booleon - Set to true clear the entire contents of the Data sheet and reload the data
 */
function getSalesData(franchise, endPoint, clear){
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActive();
  var sheet = franchise.saleItemsSheet
  var headerRows = 1 ;
  var offset = 0;
  var saleOffset;

// == -- adjust process for updating info or replacing info -- == \\   
  if(!clear){
    saleOffset = getCurrentSaleID(franchise.saleItemsSheetName);
  } else {
    clearSheet(headerRows, sheet);
    saleOffset = 0;
  }
  
// == -- Specify the type of call needed -- == \\ 
  var type = "GET";
  
// == -- Build the URL with any offsets -- == \\
  var url = franchise.sales;
  if(saleOffset > 10){
  url = franchise.sales+"&saleID=%3E,"+saleOffset
  }

// == -- Initiate the OAuth / Api Call with the given variables -- == \\ 
  var data = getData(offset,url,endPoint,type);

// == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
  insertData(sheet,data);
}

/////////////////////////////////////////////////////////////////////////////////
// map to a spread sheet
/////////////////////////////////////////////////////////////////////////////////

function  insertData(sheet,data){
  console.log("INSERT THIS DATA: ",data);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dLength = data.length;
  var dataRows = sheet.getLastRow();
  console.log("dataRows", dataRows);
  var sheetRows = sheet.getMaxRows();
  console.log("sheetRows", sheetRows);
  
  var openRows = Number(sheetRows) - Number(dataRows)
    ss.toast("row numbers open sheet data : "+openRows+" - "+sheetRows+" - "+dataRows);
  if (dLength>0){
  if(openRows < dLength){ 
    ss.toast("Inserting "+numRows+" rows");
      var numRows = Number(dLength-openRows);
      sheet.insertRowsAfter(sheet.getLastRow(), numRows);
      
      }else{
    ss.toast("row insertion not needed");}
    setRowsData(sheet, data);
  } else {
    ss.toast("Data Not Defined! Nothing to be Written to Sheet");
  };
};

//////////////////////////////////////////////////////////////////////////////////
// setRowsData fills in one row of data per object defined in the objects Array.
// For every Column, it checks if data objects define a value for it.
// Arguments:
//   - sheet: the Sheet Object where the data will be written
//   - objects: an Array of Objects, each of which contains data for a row
//   - optHeadersRange: a Range of cells where the column headers are defined. This
//     defaults to the entire first row in sheet.
//   - optFirstDataRowIndex: index of the first row where data should be written. This
//     defaults to the row immediately below the headers.
////////////////////////////////////////////////////////////////////////////////////

function setRowsData(sheet, objects, optHeadersRange, optFirstDataRowIndex) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var headersRange = optHeadersRange || sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var firstDataRowIndex = optFirstDataRowIndex || sheet.getLastRow()+1 ;
  var headers = headersRange.getValues()[0];
  var dataSet = [];
  ss.toast("processing "+ objects.length +" of Data"); 
  for (var i = 0; i < objects.length; ++i) {
    var values = []
    for (j = 0; j < headers.length; ++j) {
      var header = headers[j];
      values.push(header.length > 0 && objects[i][header] ? objects[i][header] : "");
    }
    dataSet.push(values);
  }
  ss.toast("Writing "+objects.length+" rows of data");
  var destinationRange = sheet.getRange(firstDataRowIndex, headersRange.getColumnIndex(), objects.length, headers.length);
  destinationRange.setValues(dataSet);
  var sheetName = sheet.getSheetName();
  formatColumns(sheetName)
};

/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */



/**
 * Opens a dialog. The dialog structure is described in the Dialog.html
 * project file.
 */
function showDialog() {
  var ui = HtmlService.createTemplateFromFile('Dialog')
      .evaluate()
      .setWidth(400)
      .setHeight(190)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(ui, DIALOG_TITLE);
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
  console.log("Shop ID", shopID)
  // Use data collected from sidebar to manipulate the sheet.
  var cell = SpreadsheetApp.getActive().getRangeByName('shopNum').setValue(shopID);
  var msg = "shop ID Set to " + cell.getValue();
  return 
}

function setActiveSheet(sheet) {
  console.log("value", sheet)
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