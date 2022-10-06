 /*
*
*Primary file for API
*/
//Depandencies
var http=require('http');
var https=require('https');
var url =require('url');
var StringDecoder =require('string_decoder').StringDecoder;
var config = require('./config'); 
var fs= require('fs');
var _data = require('./lib/data');


//TESTING
// @TODO delete this
_data.create('test','newFile',{'foo':'bar'},function(err){
	console.log('this was the error',err);
});


//the server should response to all request with a string
var httpServer=http.createServer((req,res)=>{
    unifiedServer(req,res);
});


//start a server , and have to listen on port 3000
httpServer.listen(config.httpPort,()=>{
	console.log("the server is listening on port  "+config.httpPort);
});


//Instantiate the https server
var httpsServerOptions={
	'key' : fs.readFileSync('./http/key.pem'),
	'cert': fs.readFileSync('./http/cert.pem')
};
var httpsServer=http.createServer(httpsServerOptions,function (req,res){
    unifiedServer(req,res);
});

//start the https server
httpsServer.listen(config.httpsPort,()=>{
	console.log("the server is listening on port  "+ config.httpsPort);
});



//unified server for both port http and https 
var unifiedServer = function(req,res){


		// get the URL and parse it
	var parsedUrl=url.parse(req.url,true);

	//Get the path 
	var path = parsedUrl.pathname;
	var trimmedPath= path.replace(/^\/+|\/+$/g,'');

	//Get a query string  as a object 
	var queryStringObject = parsedUrl.query;

	//Get the http Method
	var method = req.method.toLowerCase();

	//Get the headers as an object
	var headers=req.headers;

	//Get payload , if any
	var decoder= new StringDecoder('utf-8');
	var buffer = '';
	req.on('data',(data)=>{
		buffer+= decoder.write(data);
	});
	req.on('end',function(){
		buffer+= decoder.end();


	//choose the handler this request should go to ,
	var chosenHandler = typeof(router[trimmedPath]) !== 'undefined'	? router[trimmedPath] : handlers.notFound;

    //construct the data object to send to the handler
    var data = {
    	'trimmedPath':trimmedPath,
    	'queryStringObject':queryStringObject,
    	'method':method,
    	'headers':headers,
    	'payload':buffer
    };

    //Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload){
    	//use the status code called back by the handler ,or default
    	stausCode = typeof(statusCode) == 'number' ? statusCode : 200;


    	//use the payload clled back by the handler ,or default to 
    	payload = typeof(payload) == 'object' ? payload : {} ;

    	//convert payload to a string 
    	var payloadString = JSON.stringify(payload);

    	//Return the response
    	res.setHeader('Content-Type','application/json');
    	res.writeHead(statusCode);
    	res.end(payloadString);


    	//send the response 
	    //res.end('hello world\n');

	    //Log the request path
	    //console.log('request recive on path :'+trimmedPath+ 'with method:'+method+' and with these query string parameters',queryStringObject); 
        //  console.log('Request recevied with this Payload:',buffer);
	    console.log('Returning this response : ',statusCode,payloadString);
    })


	});

};


//Define the handlers
var handlers = {};

//sample handler
handlers.sample =function(data,callback){
	//Callback a http status code, and a payload object
	callback(406,{'name':'sample handler'});
};

//not found handler
handlers.notFound =function(data,callback){
	callback(404);
};

//Define a request router :match incoming path with hendler
var router = {
	'sample' : handlers.sample
};


