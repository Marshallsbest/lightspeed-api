////////////////////////////////////////////////////////////////////////////////////////
// == -- UpDate Function for auto reporting set to fire every 5 minutes and retrieve any new sales data based on last salesID -- == \\ 
////////////////////////////////////////////////////////////////////////////////////////
/**
 * Update the Current values to reflect any sales made since the last call
 */
function upDateAll(){
//UIONOFF = false; 
  updateSaleItems1();
//  logSales("Shop 1 Called",{})
  updateSaleItems2();
//  logSales("Shop 2 Called",{})
  updateSaleItems3();
//  logSales("Shop 3 Called",{})
  updateSaleItems4();
//  logSales("Shop 4 Called",{})
  updateSaleItems5();
//  logSales("Shop 5 Called",{})
  updateSaleItems6();
  updateSaleItems7();
}

////////////////////////////////////////////////////////////////////////////////////////
// == -- The Main Function Called for retrieving the Data from the API -- == \\ 
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
  var saleOffset = getCurrentSaleID(sheet,ssID);
    if(UIONOFF){ ss.toast("Sale Off set ID  ="+saleOffset);}

  logSales("Sales Object",saleOffset);
  var headerRows = 1 ;
  var offset = 0;
  // == -- Specify the type of call needed -- == \\ 
  var type = "GET";
  if(endPoint = "Sale"){
    // == -- Build the URL with any offsets -- == \\
    var url = shopObj.sale;
    // == -- adjust process for updating info or replacing info -- == \\   
    if(!clear){ 
      //      logSales("sales object",shopObj);
      url = url+"&saleID=%3E,"+saleOffset;
      //      logSales("log Url",url);
      updateSaleID(shopObj.name,saleOffset)
    } else {
      clearSheet(headerRows, sheet);
      saleOffset = 0;
      }
    }
  //  logSales("url",url);
  // == -- Initiate the OAuth / Api Call with the given variables -- == \\ 
  var data = getData(offset,url,endPoint,type);
  if(data.length>=0 ){
  for(var i = 0; i<data.length; i++){
      var row = data[i];
  logSales("Data Row",row);
    getNames(row);
//       fixItems(row);
       fixDates(row);
  }}
  // == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
  insertData(sheet,data);
}

/**
* Populates the Sale line data
*
*/
function getSaleLinesData(shopObj, endPoint, clear){
  var objSheet = shopObj.saleLineSheetName;
  var ssID = shopObj.ID;
logSales("Shop Object",shopObj.saleLineSheetName)
var ss = SpreadsheetApp.openById(ssID);
  var sheet = ss.getSheetByName(objSheet);
  sheet.activate();
  var saleOffset = getCurrentSaleLineID(sheet,ssID); 
  if(UIONOFF){ ss.toast("Sale Line Off set ID  ="+saleOffset);}
  var headerRows = 1;
  var offset = 0;
    // == -- Specify the type of call needed -- == \\ 
  var type = "GET";
    // == -- Build the URL with any offsets -- == \\
    var url = shopObj.saleLine;
    // == -- adjust process for updating info or replacing info -- == \\   
    if(!clear && saleOffset){ 
      //      logSales("sales object",shopObj);
      url = url+"&saleLineID=%3E,"+saleOffset;
//      logSales("log Url",url);
      updateSaleID(shopObj.name,saleOffset)
    } else {
      clearSheet(headerRows, sheet);
      saleOffset = 0;
    }
 
//    logSales("url",url);
  // == -- Initiate the OAuth / Api Call with the given variables -- == \\ 
  var data = getData(offset,url,endPoint,type);
  if(data.length>=0 ){
  for(var i = 0; i<data.length; i++){
      var row = data[i];
//  logSales("Data Row",row);
    getNames(row);
//       fixItems(row);
       fixDates(row);
  }}
  // == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
  insertData(sheet,data);
}

//////////////////////////////////////////////////////////////////////////////////////
// Checks for completed sale and adjusts the nonsale count 
//////////////////////////////////////////////////////////////////////////////////////
//function checkSale(dataRow){
//   if(dataRow.completed || dataRow.saleLineID ){
//            if(dataRow.completed == "false"){
//              dataRow.nonSale.value += 1;
//              //              logSales("non Sale "+nonSale)
//            }
//          }
// return dataRow
//}

///////////////////////////////////////////////////////////////////////////////////////
// Gets All sale ID tags and finds the largest in hte column
///////////////////////////////////////////////////////////////////////////////////////
function getCurrentSaleID(sheet,ssID){
//  var ss = SpreadsheetApp.openById(ssID);
//  var sheet = ss.getSheetByName(sheetName);
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues();
  var colIndex = headers[0].indexOf("saleID")+1;
  var column = sheet.getRange(2, colIndex,sheet.getLastRow()).getValues().sort(function(a, b){return a-b}).pop();
  var saleID = Math.max.apply(null, column);
    log("returned Sale ID from the Get Sale ID Function",saleID);
  return saleID
}



function getCurrentSaleLineID(sheet,ssID){
//  var ss = SpreadsheetApp.openById(ssID);
//  var sheet = ss.getSheetByName(sheetName);
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues();
  var colIndex = headers[0].indexOf("saleLineID")+1;
  var column = sheet.getRange(2, colIndex,sheet.getLastRow()).getValues().sort(function(a, b){return a-b}).pop();
  var saleLineID = Math.max.apply(null, column);
    log("returned Sale ID from the Get Sale ID Function",saleLineID);
  return saleLineID
}
