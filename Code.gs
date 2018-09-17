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
    .addItem('Get Me My Data','getMeTheData')
    .addItem('Show sidebar', 'showSidebar')
    .addItem('Show dialog', 'showDialog')
    .addItem('Reset Service','reset')
    .addToUi();

//    var user = Session.getEffectiveUser().getEmail();
//  var scriptProperties = PropertiesService.getScriptProperties();
//  var scope = scriptProperties.getProperty(user);  
//  console.log('User should be shown here:', user)
//  setScope(scope);
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
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
}


//////////////////////////////////////////////////////////////////
// Reset The Auth Service
//////////////////////////////////////////////////////////////////

function reset() {
  getDragonLight().reset();}

//////////////////////////////////////////////////////////////////
// Set the permissions available to the effective user **just begining this part 
//////////////////////////////////////////////////////////////////

function setScope(scope){
var results = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("SHOPTABLE");
var shopTable = results.getDisplayValues();
var array = [];

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

/////////////////////////////////////////////////////////////////////////////
// Actual API call
/////////////////////////////////////////////////////////////////////////////

/**
 * Build the url from the Named Range on the API sheet 
 * coresponding to the Active sheet name
 * @params {integer} offset  the number at which the returned 100 lines begins 
 * @params {string} url call to the api
 * @params {string} sheetName the name of the end point 
 * @params {string} the type of call to make [GET, POST, PUT, DELETE]
 * @return {Object} data[] 
*/
function getData(offset,url, sheetName, type){
  var service = getDragonLight();
  if (service.hasAccess()) {
    var loop = true;
    var data = [];
    var apiUrl;
    Logger.log("before while loop- offset:",offset)
    while (loop){
    
    Logger.log("after while loop- offset:",offset)
      if(offset <= 0){
      apiUrl = url;
      }else{
      apiUrl = url+"&offset="+offset;
      }
      Logger.log("Offset Added to url")
      Logger.log(apiUrl);
      var headers = {
        "Authorization": 'Bearer ' + service.getAccessToken(),  
        "Accept": 'application/json'
      };
      var options = {
        "headers": headers,
        "method" : type,
        "muteHttpExceptions": true
      };
      var relation = SpreadsheetApp.getActive().getRangeByName("Relation").getValue();
      Logger.log(relation);
      var relationship = SpreadsheetApp.getActive().getRangeByName("Relationship").getValue();
      var choice;
      if(relation.valueOf()==true){ choice = sheetName[relationship]} else {choice = sheetName};
      Logger.log(choice);
      var response = UrlFetchApp.fetch(apiUrl,options);
      //    var responseHeaders = response.getAllHeaders();
      //    Logger.log("Response Headers",responseHeaders);
      var dataAll = JSON.parse(response.getContentText());
      var dataCounts = Object.getOwnPropertyDescriptor(dataAll, "@attributes");
      var apiData = Object.getOwnPropertyDescriptor(dataAll,choice);
//      var apiKeys = Object.getOwnPropertyNames(apiData);
//      Logger.log(apiKeys);
      Logger.log(apiData);
      for (var i=0; i<apiData.length; i++) {
        
        data.push(apiData[i]);
      }
      var dataOffSet = Number(dataCounts.value.offset||0);
      var count = Number(dataCounts.value.count||0);
      var limit = Number(dataCounts.value.limit||0);
        offset = dataOffSet + limit || 100;
//      Logger.log( "dataOffset: ", dataOffSet count limit);
//      Logger.log("Count: ", count);
//      Logger.log("Limit: ", limit);
      Logger.log("offset: ", offset);
      
      if(!isNaN(offset)){
        if(offset >= count){
          loop = false;
          Logger.log("Loop again? =",loop)
        };
      } else {
        loop = false;
        Logger.log("offset is not a number", offset)
      }
    }    
  } else {
    /*
    * Throw up an alert box to get the user the authorization dialog url
    */
    var ui = SpreadsheetApp.getUi();
    var authorizationUrl = service.getAuthorizationUrl();
    var result = ui.alert(
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
  Logger.log("returned",data);
  return data;
}

/////////////////////////////////////////////////////////////////////
// Called from Custom User Menu to initiate API call Sequence
////////////////////////////////////////////////////////////////////

function getMeTheData() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActive();
  var s = ss.getSheets();
  var dataSheet = s[0];
  var offset = Number(0);
  var type = "GET";
  var repoRange = dataSheet.getRange(3, 2);
  var sheet = ss.getActiveSheet();
  var sheetName = sheet.getSheetName(); 
  var url = ss.getRangeByName(sheetName).getValue();
  var data = getData(offset,url,sheetName,type);
  var headerRows = 1 ;
  if(sheet.getFrozenRows()>0){
    headerRows = sheet.getFrozenRows()
    Logger.log("Clear Content Data Starting at rom:", headerRows+1);
    sheet.getRange(headerRows+1, 1, sheet.getLastRow(), sheet.getMaxColumns()).clear({contentsOnly:true});
  }
  insertData(sheet,data);
}

///////////////////////////////////////////////////////////////////////////
// map to a spread sheet
//////////////////////////////////////////////////////////////////////////

function  insertData(sheet,data){
  // Logger.log("INSERT THIS DATA",data);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (data.length>0){
    if(sheet.getLastRow()<data.length){ 
      var numRows = data.length-sheet.getLastRow();
      sheet.insertRowsAfter(sheet.getFrozenRows()+1, numRows);
      ss.toast("Inserting "+numRows+" rows");
    }
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
  var firstDataRowIndex = optFirstDataRowIndex || sheet.getFrozenRows()+1;
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
    dataSet.push(values);
    //    Logger.log("dataSet IS HERE",dataSet)
  }
  ss.toast("Writing "+objects.length+" rows of data");
  var destinationRange = sheet.getRange(firstDataRowIndex, headersRange.getColumnIndex(), objects.length, headers.length);
  destinationRange.setValues(dataSet);
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
function setActiveValue(value) {
  // Use data collected from sidebar to manipulate the sheet.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  cell.setValue(value);
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