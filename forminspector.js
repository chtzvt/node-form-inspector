//NodeJS HTTP Testing server
//For forms and the like. 
//By Charlton Trezevant

//Loads our dependencies.
var http = require('http');
var url = require('url') ;
var qs = require('querystring');

//On what port should the server run?
var PORT = 8082;
//Should we respond normally to requests that are empty? (if false, we'll return an error to the user.)
var ALLOW_EMPTY_REQS = false;

//Date & time function so that responses are timestamped.
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

//This function is used to determine whether the request object is empty.
function isEmptyRequest(query) {
  for(var prop in query) {
    if(query.hasOwnProperty(prop))
      return false;
    }
  return true;
}

http.createServer(function (req, res) {

//If we've received an empty request, and we decided not to allow those, then we'll return an error.
if((isEmptyRequest(url.parse(req.url,true).query) && req.method === "GET" && ALLOW_EMPTY_REQS === false) || (qs.parse(body) && req.method === "POST" && ALLOW_EMPTY_REQS === false)) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Headers', "X-Requested-With");
  res.writeHead(200);
  res.end('{ "error": "empty request" }');
  return;
}

//This if/else block deals with the different methods necessary to deal with different kinds of requests.
if(req.method === "GET") {

  var params = url.parse(req.url,true).query;
  params.fi_timeStamp = getDateTime();
  params.fi_requestIP = req.connection.remoteAddress;
  params.fi_method = "GET";
  params.req_headers = JSON.parse(JSON.stringify(req.headers, null, 4));
  
  console.log(params.fi_timeStamp + " Got these parameters: " + JSON.stringify(params, null, 4));

  //CORS support
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Headers', "X-Requested-With");
  res.writeHead(200);
  res.end(JSON.stringify(params, null, 4));

} else if (req.method === "POST") {
  var body = '';
     req.on('data', function (data) {
          body += data;
            //Stop requests that are too large.
	    //This kills the skiddie :)
	    if (body.length > 1e6) { 
                req.connection.destroy();
            }
      });
      
      req.on('end', function () {
          var params = qs.parse(body);
	  params.fi_timeStamp = getDateTime();
	  params.fi_requestIP = req.connection.remoteAddress;
	  params.fi_method = "POST";
	  params.req_headers = JSON.parse(JSON.stringify(req.headers, null, 4));
	  
  	  console.log(params.fi_timeStamp + " Got these parameters: " + JSON.stringify(params, null, 4));
	  
	  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	  res.setHeader('Access-Control-Allow-Headers', "X-Requested-With");
  	  res.writeHead(200);
  	  res.end(JSON.stringify(params, null, 4));
      });
}}).listen(PORT);

