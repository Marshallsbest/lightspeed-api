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
    
  };
  var createDay = dataRow.createTime;
  var createMonth = dataRow.createTime;
  dataRow.createDay = createDay;
  dataRow.createMonth = createMonth;
  dataRow.time = dataRow.createTime;
//  dataRow.hour = createHour;
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
}


////////////////////////////////////////////////////////////////////////////////////
// This Assigns the item description, category and qty to the corresponding columns 
////////////////////////////////////////////////////////////////////////////////////
function fixItems(dataRow){
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
    }
  }else {
    dataRow.LineItemDesc0 = sLine.Item.description;
    dataRow.LineItemQty0 = sLine.unitQuantity;
    dataRow.LineItemCat0 = sLine.Item.categoryID;
    saleItemQty = Number(saleItemQty) + Number(sLine.unitQuantity);
  }
  dataRow.SaleItemQty = saleItemQty;
  return dataRow;
}


///////////////////////////////////////////////////////////////////////////////////////
// Gets All sale ID tags and finds the largest in hte column
///////////////////////////////////////////////////////////////////////////////////////
function getCurrentSaleID(sheetName){
  var s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = s.getRange(1,1,1,s.getLastColumn()).getValues();
  var colIndex = headers[0].indexOf("saleID")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).getValues().sort(function(a, b){return a-b}).pop();
  var saleID = column.reduce(function(previous,current) {
    if(previous>current){current = previous}
    return current;
  },0);
  return saleID
}


///////////////////////////////////////////////////////////////////////////////////////
// Set Column Formating 
///////////////////////////////////////////////////////////////////////////////////////
function formatColumns(sheetName){
  var s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = s.getRange(1,1,1,s.getLastColumn()).getValues();
  var colIndex = headers[0].indexOf("createDay")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("DDDD");
  var colIndex = headers[0].indexOf("createMonth")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("MMMM");
  var colIndex = headers[0].indexOf("createTime")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("yyyy-MM-dd");
  var colIndex = headers[0].indexOf("updateTime")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("yyyy-MM-dd");
  var colIndex = headers[0].indexOf("completeTime")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("yyyy-MM-dd");
  var colIndex = headers[0].indexOf("time")+1;
  var column = s.getRange(2, colIndex,s.getLastRow()).setNumberFormat("HH:mm:ss");
}