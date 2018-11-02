/** 
* Scopes Needed:
*   'employee:all'	// View, create, update, and archive items and inventory.
*   'employee:customers'	// View, create, update, and archive customers.    
*
* https://cloud.lightspeedapp.com/oauth/authorize.php?response_type=code&client_id={client_id}&scope=employee:inventory+employee:customers
*
* callback URI: https://script.google.com/macros/d/1OkI_OLsTwUWNRR90_VOaJ9eASAhaE8pU2vCDNlOThXq3ZiV0S_3GXmJp/usercallback
* 
* Logs the redirect URI to register.
* API Play ground link https://developers.google.com/oauthplayground/#step3&scopes=employee%3Ainventory%2C%20employee%3Acustomers&url=https%3A%2F%2Fapi.lightspeedapp.com%2FAPI%2FAccount%2F166476%2FCustomer.json&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=checked&oauthEndpointSelect=Custom&oauthAuthEndpointValue=https%3A%2F%2Fcloud.lightspeedapp.com%2Foauth%2Fauthorize.php%3F&oauthTokenEndpointValue=https%3A%2F%2Fcloud.lightspeedapp.com%2Foauth%2Faccess_token.php&headerList=Accept%3Dapplication%2525252Fjson&includeCredentials=unchecked&accessTokenType=oauth&autoRefreshToken=checked&accessType=offline&prompt=consent&response_type=code
* 
* googe link https://cloud.lightspeedapp.com/oauth/authorize.php?scope=employee%3Ainventory+employee%3Acustomers&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&response_type=code&client_id=51f4482883eaf70aa3d9b7e586798fe1ac305ac138f46398fd3fedfa3821c059&access_type=offline
*
*/
////////////////////////////////////////////////////////////////////////////
// configure the service
////////////////////////////////////////////////////////////////////////////

function getDragonLight() {
  var scriptProperties = PropertiesService.getScriptProperties();
  Logger.log(scriptProperties);
  return OAuth2.createService('Dragon')
  .setParam("response_type","code")
  .setAuthorizationBaseUrl(scriptProperties.getProperty('ACCESS_URL'))
  .setTokenUrl(scriptProperties.getProperty('TOKEN_URL'))
  .setClientId(scriptProperties.getProperty('CLIENT_ID'))
  .setClientSecret(scriptProperties.getProperty('CLIENT_SECRET'))
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getScriptProperties())
  .setCache(CacheService.getScriptCache())
  .setScope('employee:all')
  //    .setScope('employee:customers_read+employee:customers+employee:admin_employees+employee:admin_shops+employee:admin+employee:reports+employee:register_read+employee:register'); 
}

////////////////////////////////////////////////////////////////////////////
// Logs the redict URI to register
// can also get this from File > Project Properties
////////////////////////////////////////////////////////////////////////////

function logRedirectUri() {
  var service = getDragonLight();
  console.log(service.getRedirectUri());
}

////////////////////////////////////////////////////////////////////////////
// handle the callback
///////////////////////////////////////////////////////////////////////////

function authCallback(request) {
  var dragonLight = getDragonLight();
  var isAuthorized = dragonLight.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
};


/**
*
* Throw and Alert box up with the url to re Authorize th etoken if needed
*
*/
function reAuth(service){  
  var ui = SpreadsheetApp.getUi();
  var authorizationUrl = service.getAuthorizationUrl();
  var result = ui.alert("Authorize Lightspeed", "Click OK to see the link to copy and paste in to your browser to authorize the app", ui.ButtonSet.OK_CANCEL);
  if (result == ui.Button.OK) {ui.alert(authorizationUrl)}// User clicked "Yes"
  else {ui.alert('Permission denied.')}// User clicked "No" or X in the title bar
  Logger.log('Open the following URL and re-run the script: %s',authorizationUrl);
  return service
};

/**
*Reset The OAuth Service
*/
function reset(){
  getDragonLight().reset();
}
