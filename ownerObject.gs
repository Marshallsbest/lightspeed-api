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

// == -- template calls for spead Sheet templates
function templateSale(){
 return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sale');
}
function templateEmployee(){
 return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
}

/**
* Employee Id Object used for referencing employee first names
*
*
*/
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


/////////////////////////////////////////////////////////////////////////////////////////
// The disticnt Object creation for populatong Data to a sheet
/////////////////////////////////////////////////////////////////////////////////////////
/**
* the following functions generate Objects used to make the specific URLs and start the API call Squence 
*/

function resetSaleItems5(){
  
  var brampton = recal("Brampton")|| new shopObject("Brampton",5);
  store("Brampton",brampton); 
//  log("Branpton",brampton);
  getSalesData(brampton,"Sale", true)
}
function updateSaleItems5(){
  var brampton = recal("Brampton")|| new shopObject("Brampton",5);
  store("Brampton", brampton); 
//  log("Branpton",brampton);
  getSalesData(brampton,"Sale", false)
}
function resetSaleItems7(){
  var dundas = recal("Dundas")|| new shopObject("Dundas",7);
  store("Dundas", dundas); 
//  log("Dundas",dundas);
  getSalesData(dundas,"Sale", true)
}
function updateSaleItems7(){
  var dundas = recal("Dundas")|| new shopObject("Dundas",7);
  store("Dundas", dundas); 
//  log("Dundas",dundas);
  getSalesData(dundas,"Sale", false)
}
function resetSaleItems6(){
  var dixie = recal("Dixie")|| new shopObject("Dixie",6);
  store("Dixie", dixie); 
//  log("Dixie",dixie);
  getSalesData(dixie,"Sale", true)
}
function updateSaleItems6(){
  var dixie = recal("Dixie")|| new shopObject("Dixie",6);
  store("Dixie", dixie); 
//  log("Dixie",dixie);
  getSalesData(dixie,"Sale", false)
}
function resetSaleItems4(){
  var fergus = recal("Fergus")|| new shopObject("Fergus",4);
  store("Fergus", fergus); 
//  log("fergus",fergus);
  getSalesData(fergus,"Sale", true)
}
function updateSaleItems4(){
  var fergus = recal("Fergus") ||  new shopObject("Fergus",4);
  store("Fergus", fergus); 
//  log("fergus",fergus);
  getSalesData(fergus,"Sale", false)
}
function resetSaleItems2(){
  var milton = recal("Milton")|| new shopObject("Milton",2);
  store("Milton", milton); 
//  log("Milton",milton);
  getSalesData(milton,"Sale", true)
}
function updateSaleItems2(){
  var milton = recal("Milton")|| new shopObject("Milton",2);
  store("Milton", milton); 
//  log("Milton",milton);
  getSalesData(milton,"Sale", false)
}
function resetSaleItems3(){
  var fiveAndTen = recal("FiveAndTen")|| new shopObject("FiveAndTen",3);
  store("FiveAndTen", fiveAndTen); 
//  log("FiveAndTen",fiveAndTen);
  getSalesData(fiveAndTen,"Sale", true)
}
function updateSaleItems3(){
  var fiveAndTen = recal("FiveAndTen")|| new shopObject("FiveAndTen",3);
  store("FiveAndTen", fiveAndTen); 
//  log("FiveAndTen",fiveAndTen);
  getSalesData(fiveAndTen,"Sale", false)
}
function resetSaleItems1(){
  var georgetown = recal("Georgetown")|| new shopObject("Georgetown",1);
  store("Georgetown", georgetown); 
//  log("Georgetown",georgetown)
  getSalesData(georgetown,"Sale", true)
}
function updateSaleItems1(){
  var georgetown = recal("Georgetown")|| new shopObject("Georgetown",1);
  store("Georgetown", georgetown); 
//  log("Georgetown",georgetown);
  getSalesData(georgetown,"Sale", false)
}
function employeeData(){
  var people = new employee(false);
  getEmployeeData(people,"Employee",true)
}