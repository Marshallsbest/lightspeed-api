//////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// == -- A collection of small tool type functions -- == \\
//////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/**
* Log - Asimple little tool function for making logging easier
* Params {String} value - the objects title or label 
* Params {Object} obj - the object passed in for logging
*/
function log(value, obj){
  console.log(value, obj);
  Logger.log(value, obj);
}


/**
* Recal - A simple little tool function for getting objects from the ScriptProperties
* Params {String} key - the Key of the property to be returned 
* output {Object} shop - the object returned after parsing
*/
function recal(key){
  var obj = PropertiesService.getScriptProperties().getProperty(key);
  var shop = JSON.parse(obj);
  return shop
}

/**
*  Store - Sets an Object to the Script Properties for storage
*  Params {String} key - the string used to identify the object for recal
*  Params {Object} obj - the object to store should be stringified before calling this function
*/
function store(key,obj){
 var json = JSON.stringify(obj)
  PropertiesService.getScriptProperties().setProperty(key,json);
}

/**
*
*  Store Headers - Gets the Headers from the Sales sheet for Storage
*
*/   
function storeHeaders(){
  var data = SpreadsheetApp.openById('11fYtjQL2mptiswtHZ8Q28CDrfU_8kmucqBkqW9bK8g4').getRangeByName('SALES_HEADERS').getValues();
  store("saleHeaders",data);
}

function updateSaleID(name,saleOffset){
  var obj = recal(name);
  obj.saleID = saleOffset;
  store(name,obj);
}
  
/**
*
*  Reset - Gets the the Object key from a user promt and Deletes the Property
*
*/ 
function resetShopObject(){
  var shopName = getUserInput()
    PropertiesService.getScriptProperties().deleteProperty(shopName);
  }
  
  /**
*
*  Input - Propmt a text filed for input from the user to get a string fieldvalue
*
*/ 
 function getUserInput(){ 
   var ui = SpreadsheetApp.getUi();
    var eResponse = ui.prompt("Shop Object Reset","Please Enter the Shop Name you want to reset",  ui.ButtonSet.YES_NO)
      if (eResponse.getSelectedButton() == ui.Button.YES) {
      var shopName = eResponse.getResponseText()
    } else if (eResponse.getSelectedButton() == ui.Button.NO) {
      ui.alert("Email address not added make sure to add the document later");
      return
    } else {
      return
    }
    return shopName
    }