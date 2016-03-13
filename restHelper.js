/* 
restHelper Module
Author: M3LiNdRu
Date: 13/03/2016
*/

//External Modules
var http = require('http');

//Private variables

var request = null;
var options = {
  host: null,
  port: 80,
  path: '/',
  method: 'GET',
  headers: {
        'Cache-Control': 'no-cache',
  }
};


//Public Methods

exports.GET = function(url, resource, responseCallback) {
    options.host = url;
    options.path = resource;
    options.method = 'GET';
    request = http.request(options, responseCallback); 
    request.on('error', function(e) {
        console.log('Problem with GET request: ' + e.message);
    });

    request.end();
    
    console.log('Request GET launched.');
}

exports.POST = function(url, resource, data, responseCallback) {
    options.host = url;
    options.path = resource;
    options.method = 'POST';
    options.headers['Content-Type'] = 'application/json'; 
    options.headers['Content-Length'] = JSON.stringify(data).length
    
    request = http.request(options, responseCallback); 
    request.on('error', function(e) {
        console.log('Problem with POST request: ' + e.message);
    });
    request.write(JSON.stringify(data));
    request.end();
    
    console.log('Request POST launched.');
}

exports.PUT = function(url, resource, data) {
  console.log('Method not Implemented.');
}

exports.DELETE = function(url, resource) {
  console.log('Method not Implemented.');
}

exports.OPTIONS = function(url, resource) {
  console.log('Method not Implemented.');
}
