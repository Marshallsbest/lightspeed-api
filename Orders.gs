  ////////////////////////////////////////////////////////////////////////////////////////
// == -- UpDate Function for auto reporting set to fire every 5 minutes and retrieve any new sales data based on last salesID -- == \\ 
////////////////////////////////////////////////////////////////////////////////////////
/**
 * Update the Current values to reflect any sales made since the last call
 */
function upDateOrdersOrders(){
UIONOFF = false; 
//  updateOrderItems1();
//  logOData("Shop 1 Called",{})
//  updateOrderItems2();
//  logOData("Shop 2 Called",{})
//  updateOrderItems3();
//  logOData("Shop 3 Called",{})
  updateOrderItems4();
  logOData("Shop 4 Called",{})
//  updateOrderItems5();
//  logOData("Shop 5 Called",{})
//  updateOrderItems6();
//  updateOrderItems7();
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
function getOrderData(shopObj, endPoint, clear){
  var objSheet = shopObj.salesSheetName;
  var ssID = shopObj.ID;
  var ss = SpreadsheetApp.openById(ssID);
  var sheet = ss.getSheetByName(objSheet);
  sheet.activate();
  logOData("Order Object",orderOffset);
  var headerRows = 1 ;
  var offset = 0;
  var worker = new DataObject("employeeID","firstName");
  // == -- Specify the type of call needed -- == \\ 
  var type = "GET";
  if(endPoint = "Order"){
    // == -- Build the URL with any offsets -- == \\
    var url = shopObj.sales;
    // == -- adjust process for updating info or replacing info -- == \\   
    if(!clear){ 
      //      logOData("sales object",shopObj);
      url = url+"&saleID=%3E,"+orderOffset;
      //      logOData("log Url",url);
      updateSaleID(shopObj.name,orderOffset)
    } else {
      clearSheet(headerRows, sheet);
      orderOffset = 0;
    }
    }
  //  logOData("url",url);
  // == -- Initiate the OAuth / Api Call with the given variables -- == \\ 
  var data = getData(offset,url,endPoint,type);
  for( var row in data){
    fixDates(row);
    getNames(row,worker);
    fixItems(row);
  }
  // == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
  insertData(sheet,data);
}

/**
* Populates the Sale line data
*
*/
function getOrderLineData(shopObj, endPoint, clear){
  var objSheet = shopObj.orderLineSheetName;
  var ssID = shopObj.ID;
  logOData("Shop Object",shopObj.orderLineSheetName)
  var ss = SpreadsheetApp.openById(ssID);
  var sheet = ss.getSheetByName(objSheet).activate();
  //  sheet.activate();
  var orderOffset = getCurrentOrderID(objSheet,ssID);
  logOData("order Offset",orderOffset);
  var headerRows = 1 ;
  var offset = 0;
  var worker = new DataObject("employeeID","firstName");
  // == -- Specify the type of call needed -- == \\ 
  var type = "GET";
  if(endPoint = "OrderLine"){
    // == -- Build the URL with any offsets -- == \\
    var url = shopObj.orderLine;
    // == -- adjust process for updating info or replacing info -- == \\   
    if(!clear && !orderOffset){ 
      //      logOData("sales object",shopObj);
      url = url+"&orderID=%3E,"+orderOffset;
      logOData("log Url",url);
      updateID(shopObj.name,orderOffset,endPoint)
    } else {
      clearSheet(headerRows, sheet);
      orderOffset = 0;
    }
  }
  logOData("url",url);
  // == -- Initiate the OAuth / Api Call with the given variables -- == \\ 
  var data = getOrderData(offset,url,endPoint,type);
  for( var row in data){
    fixDates(row);
    getNames(row,worker);
    fixItems(row);
  }
  // == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
  insertOrderData(sheet,data);
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
function getOrdersData(offset,url, endPoint, type){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var service = getDragonLight();
  var data = [];
  var choice = endPoint;
  var apiUrl;
  var loopCount = 0;
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
//      logOData("response Headers",responseHeaders);
//      logOData("response",response);
      var obj = JSON.parse(response.getContentText());
      var dataCounts = Object.getOwnPropertyDescriptor(obj, "@attributes");
//      logOData("datacounts", dataCounts);
//      logOData("datacounts", obj);
      var count = Number(dataCounts.value.count);
      var limit = Number(dataCounts.value.limit||100);
//      logOData("Count -= : ", count)
      var objData =  Object.getOwnPropertyDescriptor(obj,choice);
//       logOData("objData: ",objData)
  logOData("choice ",choice);
  if(count>0){
        for (var i = 0 ; i < objData.value.length; i++ ){
      logOData("objData.value.length: ",objData.value.length)
          var dataRow = objData.value[i]; 
              dataAll.push(dataRow); // <- recursive call
          }
      }else{logOData("Count is empty",count);}
      // == -- Check and make repeat calls with offset to get all the needed Data -- == \\
      var curCount = Number(dataAll.length);
      //      logOData("Current Count"+curCount+" non Sale "+nonSale+" dataAll size "+dataAll.length )
      if(count > curCount && loopCount != curCount){
        offset = curCount; 
        if(UIONOFF){ ss.toast("Number of Completed Order Records Found and Processed ="+dataAll.length+" out of "+curCount+" of "+count);}
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
function  insertOrderData(sheet,data){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dLength = data.length;
  logOData("data at Insert Sheet", data)
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
    setOrderRowsData(sheet, data);
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
function setOrderRowsData(sheet, objects, optHeadersRange, optFirstDataRowIndex) {
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
  var destinationRange = sheet.getRange(firstDataRowIndex, headersRange.getColumnIndex(), objects.length, headers.length);
  if(UIONOFF){ ss.toast("Writing "+objects.length+" rows of data");}
  destinationRange.setValues(dataSet);
  formatColumns(sheet) 
};


