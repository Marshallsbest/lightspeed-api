////////////////////////////////////////////////////////////////////////////////////////
// == -- This is used to build the end point used to make calls to Light Speed -- == \\
////////////////////////////////////////////////////////////////////////////////////////
/**
* Build the url from the Named Range on the API sheet 
* coresponding to the Active sheet name
* @params {integer} offset - the number at which the returned 100 lines begins 
* @params {string} url - call to the api
* @params {string} endPoint - the name of the end point 
* @params {string} type - the type of call to make [GET, POST, PUT, DELETE]
* @return {Object} data[] 
*/
function getData(offset,url, endPoint, type){
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
//      logData("response Headers",responseHeaders);
//      logData("response",response);
      var obj = JSON.parse(response.getContentText());
      var dataCounts = Object.getOwnPropertyDescriptor(obj, "@attributes");
//      logData("datacounts", dataCounts);
//      logData("datacounts", obj);
      var count = Number(dataCounts.value.count);
      var limit = Number(dataCounts.value.limit||100);
//      logData("Count -= : ", count)
      var objData =  Object.getOwnPropertyDescriptor(obj,choice);
//       logData("objData: ",objData)
//  logData("choice ",choice);
  if(count>0){
        for (var i = 0 ; i < objData.value.length; i++ ){
  //     q logData("objData.value.length: ",objData.value.length)
          var dataRow = objData.value[i]; 
          dataAll.push(dataRow); // <- recursive call
        }
      } else{logData("Count is empty",count);}
      // == -- Check and make repeat calls with offset to get all the needed Data -- == \\
      var curCount = Number(dataAll.length);
      //      logData("Current Count"+curCount+" non Sale "+nonSale+" dataAll size "+dataAll.length )
      if(count > curCount && loopCount != curCount){
        offset = curCount; 
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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// == -- Date : get the Week number according to ISO See notes for Attribution -- == \\
// This portion of the script (Date.getWeek) is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  logData("fixdates Called",dataRow);
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


////////////////////////////////////////////////////////////////////////////////////
// This Assigns the item description, category and qty to the corresponding columns 
////////////////////////////////////////////////////////////////////////////////////
function fixItems(dataRow){
    dataRow.HST = Number(dataRow.tax1Rate)+Number(dataRow.tax2Rate);
    dataRow.calcTax = Number(dataRow.calcTax1)+Number(dataRow.calcTax2);
    dataRow.firstName = DataObject("employeeID","firstName");
   return dataRow;
  
}


////////////////////////////////////////////////////////////////////////////////////
// Employee Id Object used for referencing employee first names
////////////////////////////////////////////////////////////////////////////////////
function testWorker(){
 var worker = new DataObject("employeeID","firstName");
 }


function DataObject(keyRange,valueRange){
  var s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Employee");
  var headers = s.getRange(1,1,1,s.getLastColumn()).getValues();
  var colIndex = headers[0].indexOf(keyRange);
  var fnIndex = headers[0].indexOf(valueRange);
  var info = {};
  var data= s.getDataRange().getValues();
  for(var i = 1; i<data.length;i++){
    var row = data[i];
    var key = row[colIndex];
    var value = data[i][fnIndex];
    this[key]= value
    }
return this
}


////////////////////////////////////////////////////////////////////////////////////////
// Building the headers and make the API Call
////////////////////////////////////////////////////////////////////////////////////////
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

//          dataRow.nonSale = nonSale;
//          logData("data Row",dataRow);
//          // == -- Process the Date fields to return proper Date Objects -- == \\ 
//          fixDates(dataRow);
//          // == -- Check to see if Sale is completed before processing -- == \\
//          checkSale(dataRow);
//          nonSale = dataRow.nonSale;
//          //            logData(dataRow.completed)
//          // == -- Find and seperate Sale Item Info -- == \\ 
//          fixItems(dataRow);
//          
//          if(choice != 'employeeData'){
//          logData("GET NAMES CALLED", choice);
//     
//          };             