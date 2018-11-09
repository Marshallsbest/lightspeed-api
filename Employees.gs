    // == -- Specific Calls For the Employee Data -- == \\
function employee(employeeID){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  this.base = "https://api.lightspeedapp.com/API/Account/166476/Employee.json",
    this.hours = "https://api.lightspeedapp.com/API/Account/166476/EmployeeHours.json",
      this.timeCard = "https://api.lightspeedapp.com/API/Account/166476/EmployeeHours/employeeHoursID.json",
        this.employeeSheetName = "Employee",
          this.employeeSheet = ss.getSheetByName(this.employeeSheetName)|| ss.insertSheet(this.employeeSheetName,{template:templateEmployee()})
  if(employeeID){
//  console.log("employeeID: ", employeeID);
    var service = getDragonLight();
    if (service.hasAccess()){
      var url = "https://api.lightspeedapp.com/API/Account/166476/Employee/"+employeeID+".json";
//  console.log("employeeID: ", url);
  var response = callApi(url,service,"Get");
      this.employee = JSON.parse(response.getContentText()),
        this.firstName = employee.firstName||"Dragon",
          this.lastName = employee.lastName||"Vape",
            this.clockInEmployeeHoursID = this.employee.clockInEmployeeHoursID||0
    }else{reAuth(service)}
  }
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
    //  log("data being Sent!",data)
    // == -- Make the call to insert the rows needed for the new data and insert the data -- == \\ 
    if(data){
      insertData(sheet,data);}else{log("No data Fouund to insert", data)}
  };

///////////////////////////////////////////////////////////////////////
// == -- Retrieve Emplyee names by ID and add to the row -- == \\ 
///////////////////////////////////////////////////////////////////////
function getNames(dataRow, worker){
  if(dataRow.employeeID){
    var ID = dataRow.employeeID
    dataRow.firstName = worker[ID]
  };
  return dataRow
};