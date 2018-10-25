//------- Specific Calls for Five and Ten Data ----------//
function franchisee(shopName,shopId){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  this.shopName = shopName,
    this.shopId = shopId,
      this.order = "https://api.lightspeedapp.com/API/Account/166476/Order.json?&shopID="+shopId,
        this.orders = "https%3A%2F%2Fapi.lightspeedapp.com%2FAPI%2FAccount%2F166476%2FOrder.json%3Fload_relations%3D%5B%22OrderLines%22%5D%26shopID%3D"+shopId,
          this.orderLine = "https://api.lightspeedapp.com/API/Account/166476/OrderLine.json?&shopID="+shopId,
            this.sale = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?shopID="+shopId,
              this.sales = "https://api.lightspeedapp.com/API/Account/166476/Sale.json?load_relations=[%22SaleLines.Item%22]&shopID="+shopId,
                this.saleLine = "https://api.lightspeedapp.com/API/Account/166476/SaleLine.json?&shopID="+shopId,
                  this.saleSheetName = shopName+"Sales",
                    this.saleSheet = ss.getSheetByName(this.saleSheetName)|| ss.insertSheet(this.saleSheetName,{template:templateSale()}) 
                    this.saleItemsSheetName = shopName+"SalesItems",
                      this.saleItemsSheet = ss.getSheetByName(this.saleItemsSheetName)|| ss.insertSheet(this.saleItemsSheetName,{template:templateSaleItems()}) 
                      

}

function templateSale(){
 return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sale');
}
function templateSaleItems(){
 return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sale');
}
