///////////////////////////////////////////////////////////////
// ad custom menu when the spread sheet opens
///////////////////////////////////////////////////////////////
var UIONOFF = true;


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

////////////////////////////////////////////////////////////////////////////////////////
// == -- UpDate Function for auto reporting set to fire every 5 minutes and retrieve any new sales data based on last salesID -- == \\ 
////////////////////////////////////////////////////////////////////////////////////////
/**
 * Update the Current values to reflect any sales made since the last call
 */
function upDateAll(){
UIONOFF = false; 
  updateSaleItems1();
  log("Shop 1 Called",{})
  updateSaleItems2();
  log("Shop 2 Called",{})
  updateSaleItems3();
  log("Shop 3 Called",{})
  updateSaleItems4();
  log("Shop 4 Called",{})
  updateSaleItems5();
  log("Shop 5 Called",{})
  updateSaleItems6();
  updateSaleItems7();
}
function updateFergus(){
updateSaleItems4()
}
////////////////////////////////////////////////////////////////////////////////////////
// == -- The Main Function Called for retrieving the Data from teh API -- == \\ 
////////////////////////////////////////////////////////////////////////////////////////

/**
 * Main Sales Data Function Call 
 * @param {Object} shopObj - Franchisee object to be passed in 
 * @Param {String} endPoint - name of the main End point to be called
 * @Param {Booleon} clear - Set to true clear the entire contents of the Data sheet and reload the data
 */
function getSalesData(shopObj, endPoint, clear){
  var objSheet = shopObj.salesSheetName;
  var ssID = shopObj.ID;
  var ss = SpreadsheetApp.openById(ssID);
  var sheet = ss.getSheetByName(objSheet);
  sheet.activate();
  var saleOffset = getCurrentSaleID(objSheet,ssID);
  log("Sales Object",saleOffset);
  var headerRows = 1 ;
  var offset = 0;
  // == -- Specify the type of call needed -- == \\ 
  var type = "GET";
  if(endPoint = "Sale"){
    // == -- Build the URL with any offsets -- == \\
    var url = shopObj.sales;
    // == -- adjust process for updating info or replacing info -- == \\   
    if(!clear){ 
      log("sales object",shopObj);
     url = url+"&saleID=%3E,"+saleOffset;
      log("log Url",url);
      updateSaleID(shopObj.name,saleOffset)
    } else {
      clearSheet(headerRows, sheet);
      saleOffset = 0;
    }
  } else if(endPoint = "Order"){
    // == -- Build the URL with any offsets -- == \\
    var url = shopObj.orders;
  }
  
//  log("url",url);
  // == -- Initiate the OAuth / Api Call with the given variables -- == \\ 
  var data = getData(offset,url,endPoint,type);
  
  // == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
  insertData(sheet,data);
}

/////////////////////////////////////////////////////////////////////////////////////
// Calling the API to get the Data
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Used to populate the Employee information Object used as a reference during data 
 * processing of the numerous rows 
 * @param {Object} employee - Employee object to be passed in 
 * @Param {String} endPoint - name of the main End point to be called
 * @Param {Booleon} clear - Set to true clear the entire contents of the Data sheet and reload the data
 */
function getEmployeeData(employee, endPoint, clear){
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActive();
  var sheet = employee.employeeSheet
  sheet.activate();
  var headerRows = 1 ;
  var offset = 0;
  var url = employee.base;
   
  // == -- adjust process for updating info or replacing info -- == \\   
  if(clear){
    clearSheet(headerRows, sheet);
    }
  
  // == -- Specify the type of call needed -- == \\ 
  var type = "GET";
  if(endPoint == "Hours"){
    // == -- Build the URL with any offsets -- == \\
    var url = employee.hours;
    }
    
  // == -- Initiate the OAuth / Api Call with the given variables -- == \\ 
  var data = getData(offset,url,endPoint,type);
  log("data being Sent!",data)
  // == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
  insertData(sheet,data);
}

////////////////////////////////////////////////////////////////////////////////////////
// == -- This is used to build the end point used to make calls to Light Speed -- == \\
////////////////////////////////////////////////////////////////////////////////////////
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
  var loopCount = 0;
  var nonSale = 0;
  var worker = new DataObject("employeeID","firstName");
  // == -- Get OAuth Token before making the API Call -- == \\ 
  if (service.hasAccess()){
    var loop = true;
    var dataAll = [];   
    // == -- API limits returned Data to 100 lines, Loop calls till all lines are retrieved -- == \\  
    while (loop){
      if(offset <= 0){
        apiUrl = url;
      } else {
        apiUrl = url+"&offset="+offset;
      };
      // == -- Build API Headers -- == \\
      var response = callApi(apiUrl, service, type)
      var responseHeaders = response.getAllHeaders();
      log("response Headers",responseHeaders);
      log("response",response);
      var obj = JSON.parse(response.getContentText());
      var dataCounts = Object.getOwnPropertyDescriptor(obj, "@attributes");
      var count = Number(dataCounts.value.count);
      var limit = Number(dataCounts.value.limit||100);
     
      var objData =  Object.getOwnPropertyDescriptor(obj,choice);
//         console.log("objData: ",objData)
      if(count>0){
        for (var i = 0 ; i < objData.value.length; i++ ){
//        console.log("objData.value.length: ",objData.value.length)
          var dataRow = objData.value[i];
          // == -- Process the Date fields to return proper Date Objects -- == \\ 
          fixDates(dataRow);
          // == -- Check to see if Sale is completed before processing -- == \\
          if(dataRow.completed){
            if(dataRow.completed == "false"){
           nonSale += 1;
//              console.log("non Sale "+nonSale)
            }else {
//            console.log(dataRow.completed)
            // == -- Find and seperate Sale Item Info -- == \\ 
              fixItems(dataRow);
              if(dataRow.employeeID){
                var ID = dataRow.employeeID
                dataRow.firstName = worker[ID]
              }
              dataAll.push(dataRow); // <- recursive call
            }
          }
        }
      }else{log("Count is empty",count);}
      // == -- Check and make repeat calls with offset to get all the needed Data -- == \\
      var curCount = Number(dataAll.length) + Number(nonSale);
//      console.log("Current Count"+curCount+" non Sale "+nonSale+" dataAll size "+dataAll.length )
      if(count > curCount && loopCount != curCount){
        offset = curCount; 
        var tally = count - nonSale;
  if(UIONOFF){ ss.toast("Number of Completed Sales Records Found and Processed ="+dataAll.length+" out of "+curCount+" of "+count);}
       loopCount = curCount
      } else {
        loop = false
      };
    };
  } else {
    // == -- Throw up an alert box to get the user the authorization dialog url -- == \\
    reAuth(service)
  }
//  var prompt = "There were "+nonSale+" sale Enteries which where not marked as Complete and thereby not Counted in this Spreadsheet";
//  SpreadsheetApp.getUi().alert(prompt);
  return dataAll;
}


/////////////////////////////////////////////////////////////////////////////////
// map to a spread sheet
/////////////////////////////////////////////////////////////////////////////////
/**
 * Check and make sure the designated sheet has enough rows to recieve the data to be written 
 * @param {Object} sheet - A Spreadsheet Object that will recieve the Data 
 * @Param {Object} data - the processed Data to be written to the sheet
 */
function  insertData(sheet,data){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dLength = data.length;
  var dataRows = sheet.getLastRow();
  var sheetRows = sheet.getMaxRows();
  var insertRow = sheet.getLastRow();
  var openRows = Number(sheetRows) - Number(dataRows)
  if(UIONOFF){ ss.toast("row numbers open, sheet, data, : "+openRows+" - "+sheetRows+" - "+dataRows);}
  if (dLength>0){
    if(openRows < dLength){ 
      if(UIONOFF){ ss.toast("Inserting "+numRows+" rows");}
      var numRows = Number(dLength-openRows);
      if(insertRow <2){insertRow=2};
      sheet.insertRowsAfter(insertRow, numRows);
      
    }else{
    if(UIONOFF){ ss.toast("row insertion not needed");}
      }
    setRowsData(sheet, data);
  } else {
    if(UIONOFF){ ss.toast("Data Not Defined! Nothing to be Written to Sheet");}
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
/**
 * Write the Data to the Spreadsheet 
 * @param {Object} sheet - The Spreadsheet to which the data will be written
 * @Param {Object} objects - The data  to be written to the Sheet
 * @Param {Object} optHeadersRange - An optional Range object that can be used to define the header area
 * @Param {Integer} optFirstDataRowIndex - Optional number to used as Row Index to begin the new information at 
 */
function setRowsData(sheet, objects, optHeadersRange, optFirstDataRowIndex) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var headersRange = optHeadersRange || sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var firstDataRowIndex = optFirstDataRowIndex || sheet.getLastRow()+1 ;
  var headers = headersRange.getValues()[0];
  var dataSet = [];
  if(UIONOFF){ ss.toast("processing "+ objects.length +" of Data"); }
  for (var i = 0; i < objects.length; ++i) {
    var values = []
    for (j = 0; j < headers.length; ++j) {
      var header = headers[j];
      values.push(header.length > 0 && objects[i][header] ? objects[i][header] : "");
    }
    dataSet.push(values);
  }
  if(UIONOFF){ ss.toast("Writing "+objects.length+" rows of data");}
  var destinationRange = sheet.getRange(firstDataRowIndex, headersRange.getColumnIndex(), objects.length, headers.length);
  destinationRange.setValues(dataSet);
  var sheetName = sheet.getSheetName();
  formatColumns(sheet)
};


