////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// == -- Objects with spreadsheet info and url call data -- == \\
////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/**
 * Object info stored in properties retrieved from each Spreadsheet
 * @params {String} shopName - The Name of the store for use in this code
 * @params {integer} shopID - The number designation from Light Speed of the shopw
 */
function shopObject(shopName,shopId){
   this.name = shopName;
    this.lsId = shopId;
    this.salesSheetName = 'Sales_Sheet';
    this.sale = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?shop="+shopId;
    this.sales = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?load_relations=[%22SaleLines.Item%22]&shopID%3D"+shopId;
    this.saleLine = "https://api.lightspeedapp.com/API/Account/166476/SaleLine.json?&shopID="+shopId;
    this.orderSheetName = 'Orders_Sheet';
    this.order = "https://api.lightspeedapp.com/API/Account/166476/Order.json?&shopID="+shopId;
    this.orders = "https%3A%2F%2Fapi.lightspeedapp.com%2FAPI%2FAccount%2F166476%2FOrder.json%3Fload_relations%3D%5B%22OrderLines%22%5D%26shopID%3D"+shopId;
    this.orderLine = "https://api.lightspeedapp.com/API/Account/166476/OrderLine.json?&shopID="+shopId;
    this.ID = makeNewShop(this.name);
    this.saleID = 0;
    }
/**
*
* @Params {String} shopName - the Shop object to be upodated
* @Params {Object} output - Out put an object with the needed info and methods for a particular store 
*/
function shopUpdateObject(){
  var shopName = getUserInput();
  var shop = recal(shopName);
  var shopId = shop.lsId;
  shop.salesSheetName = 'Sales_Sheet';
  shop.sale = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?shop="+shopId;
  shop.sales = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?shopID="+shopId+"&load_relations=[%22SaleLines.Item%22]";
  shop.saleLine = "https://api.lightspeedapp.com/API/Account/166476/SaleLine.json?&shopID="+shopId;
  shop.orderSheetName = 'Orders_Sheet';
  shop.order = "https://api.lightspeedapp.com/API/Account/166476/Order.json?&shopID="+shopId;
  shop.orders = "https%3A%2F%2Fapi.lightspeedapp.com%2FAPI%2FAccount%2F166476%2FOrder.json%3Fload_relations%3D%5B%22OrderLines%22%5D%26shopID%3D"+shopId;
  shop.orderLine = "https://api.lightspeedapp.com/API/Account/166476/OrderLine.json?&shopID="+shopId;
store(shopName,shop)

}

/**
* This creates a new Spreadsheet with the given shop Name
* @Params {Object} shop - the Shop object to be upodated
* @Params {Object} output - Out put an object with the needed info and methods for a particular store 
*/
function makeNewShop(shopName){

  var d = DriveApp;
  var s = SpreadsheetApp;
  var folder = d.createFolder(shopName);
  var folderID = folder.getId();
  var ss = d.getFileById('1Q-ezNpjd8O7t9c5O9iXm657fvxGKq4sPzon1_aaMgUY');
  var urlId = ss.makeCopy(shopName, folder).getId();
  return urlId
}

  

 
