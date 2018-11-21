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
  var dLength = data.length || 0;
  logSData("data at Insert Sheet", data)
  var dataRows = sheet.getLastRow();
  var sheetRows = sheet.getMaxRows();
  var insertRow = sheet.getLastRow();
  var openRows = Number(sheetRows) - Number(dataRows)
  if(UIONOFF){ ss.toast("the sheet needs:"+openRows+" as there are "+sheetRows+" in total with "+dataRows+" which are already filled")}
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
    formatColumns(sheet);
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
  var destinationRange = sheet.getRange(firstDataRowIndex, headersRange.getColumnIndex(), objects.length, headers.length);
  if(UIONOFF){ ss.toast("Writing "+objects.length+" rows of data");}
  destinationRange.setValues(dataSet);
  formatColumns(sheet) 
};



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
  ////logSData("Shop ID", shopID)
  // Use data collected from sidebar to manipulate the sheet.
  var cell = SpreadsheetApp.getUi().alert(prompt);
  var create
  var msg = "shop ID Set to " + cell.getValue();
  return 
}

function setActiveSheet(sheet) {
  //logSData("value", sheet)
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

///////////////////////////////////////////////////////////////////////////////////////
// Set Column Formating 
///////////////////////////////////////////////////////////////////////////////////////
function formatColumns(sheet){
  var s = sheet;
  
  var headers = s.getRange(1,1,1,s.getLastColumn()).getValues();
  for(var i=0; i<headers[0].length;i++){
    log("Format HEADERS :", headers);
    var columnNames = headers[0][i]
    log("Format COLUMN NAMED :", headers[0][i]);
    if(columnNames == 'itemID'){
      var colIndex = headers[0].indexOf("itemID")+1;
      var column = s.getRange(2, colIndex,s.getLastRow(),6).setNumberFormat("@@@");
    }  else {
      if(columnNames == 'shopID'){
        var colIndex = headers[0].indexOf("shopID")+1;
        var column = s.getRange(2, colIndex,s.getLastRow(),6).setNumberFormat("#####00");}
      else {
      if(columnNames == 'createMonth'){
        var colIndex = headers[0].indexOf("createMonth")+1;
        var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("MMMM");}
     else {
      if(columnNames == 'createTime'){
        var colIndex = headers[0].indexOf("createTime")+1;
        var column = s.getRange(2, colIndex,s.getLastRow(),3).setNumberFormat("yyyy-MM-dd");}
     else {
      if(columnNames == "completeTime"){
        var colIndex = headers[0].indexOf("createWeek")+1;
        var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("###");}
     else {
      if(columnNames == "time"){
        var colIndex = headers[0].indexOf("time")+1;
        var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("HH:mm:ss");}
     else {
       if(columnNames == "HST"){
        var colIndex = headers[0].indexOf("HST")+1;
        var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("##%");}
        else {
       if(columnNames == "discountPercent"){
        var colIndex = headers[0].indexOf("discountPercent")+1;
        var column = s.getRange(2, colIndex,s.getLastRow(),4).setNumberFormat("##%");}
     else {
      if(columnNames == "calcDiscount"){
        var colIndex = headers[0].indexOf("calcDiscount")+1 ;
        var column = s.getRange(2, colIndex,s.getLastRow(),9).setNumberFormat("$#,##0.00");}
     else {
      if(columnNames == "unitPrice"){
        var colIndex = headers[0].indexOf("unitPrice")+1;
        var column = s.getRange(2, colIndex,s.getLastRow(),10).setNumberFormat("$#,##0.00");}
        else {
      if(columnNames == "unitQuantity"){ 
        var colIndex = headers[0].indexOf("unitQuantity")+1;
        var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("##");}
        }}}}}}}}}}}}
