var CHANNEL_ACCESS_TOKEN = getProperty('CHANNEL_ACCESS_TOKEN');
var USER_ID = getProperty('USER_ID');

function pushMessage(e) {
  var SPREAD_SHEET = SpreadsheetApp.openById('1t4mq1-nn-6vtt6jRPbwzNfNqX7wRHVxLg1K1zZx1Ew0');
  var VALUES_RANGE = SPREAD_SHEET.getRangeByName('ValuesRange');
  var values_arr = VALUES_RANGE.getValues();


  var postData = {
    "replyToken": e.replyToken,
    "messages": [{
      "type": "text",
      "text": e.message.text,
    }]
  };

  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  var response = UrlFetchApp.fetch(url, options);

  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


function getProperty(property){
  return PropertiesService.getScriptProperties().getProperty(property);
}

function doPost(e){
  var events = JSON.parse(e.postData.contents).events;
   events.forEach(function(event) {
    if(event.type == "message"){pushMessage(event);}
 });
}
