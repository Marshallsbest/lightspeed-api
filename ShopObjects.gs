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
    this.sales = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?load_relations=[%22SaleLines.Item%22]&shopID="+shopId;
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
* @Params {Object} shop - the Shop object to be upodated
* @Params {Object} output - Out put an object with the needed info and methods for a particular store 
*/
function shopUpdateObject(shop){
    var d = DriveApp;
    var s = SpreadsheetApp;
    var user = Session.getActiveUser();
    var userEmail = user.getEmail();
    var folder = d.getFolderByName(shopName)||d.createFolder(shopName);
    var folderID = folder.getId();
    var ss = d.getFileById('1iFHuGpur-fcdvA2ryR0wTSOiSEcdx6hG2AuQqWXJ9gQ');
    var ssID = ss.getId();
    var ssUrl = ss.getUrl();
    var shopSS = d.getFileByName(shopName)||ss.makeCopy(shopName, folder);
    var shopID = shopSS.getId();
    var shopUrl = shopSS.getUrl();
    var salesSheetName = "Sales_Sheet";
    var salesSheet = s.getActive().getSheetByName(salesSheetName);
    var sale = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?shopID="+shopId;
    var sales = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?load_relations=[%22SaleLines.Item%22]&shopID="+shopId;
    var saleLine = "https://api.lightspeedapp.com/API/Account/166476/SaleLine.json?&shopID="+shopId;
    var orderSheetName = "Orders_Sheet"
    var orderSheet = s.getActive().getSheetByName(orderSheetName);
    var order = "https://api.lightspeedapp.com/API/Account/166476/Order.json?&shopID="+shopId;
    var orders = "https%3A%2F%2Fapi.lightspeedapp.com%2FAPI%2FAccount%2F166476%2FOrder.json%3Fload_relations%3D%5B%22OrderLines%22%5D%26shopID%3D"+shopId;
    var orderLine = "https://api.lightspeedapp.com/API/Account/166476/OrderLine.json?&shopID="+shopId;
    var shopDoc = { 
      name:shopName,
      ID : shopID,
      shopSS : shopSS,
      shopID : shopID,
      shopUrl : shopUrl, 
      salesSheet : salesSheet,
      salesSheetName : salesSheetName,
      sale : sale,
      sales : sales,
      saleLine : saleLine,
      order : order,
      orders : orders,
      orderLine : orderLine,
      orderSheet : orderSheet,
      orderSheetName : orderSheetName,
      saleID : function(){
        return getCurrentSaleID;
      },
      saleSheet : function(){
        return SpreadsheetApp.openById(this.shopID).getSheetByName(this.salesSheetName)
      },
      orderSheet : function(){
        return SpreadsheetApp.openById(this.shopID).getSheetByName(this.ordersSheetName)
      } 
    };
    store(shopName,shopDoc)
    return this.shopDoc
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

  

 
