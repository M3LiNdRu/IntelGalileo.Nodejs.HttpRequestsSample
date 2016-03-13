/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var rest = require('./restHelper');
var ipHelper = require('./ipHelper');

console.log('Starting program'); 

var url = '';
var resource = '';
var data = {
    'Name':'Intel_Galileo_Gen2', 
    'Description': 'Hello :)',
    'Ip': '127.0.0.1'
};

console.log('LAUNCHING GET');

rest.GET(url, resource, function(res) {
      console.log('STATUS:' + res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
      });
    });

console.log('GETTING LOCAL IP ADDRESS');

ipHelper.localip(function(result) {
    console.log('IP: ' + result);
    if (result != null && result.length > 0) data.Ip = result[0]; 
});

console.log('LAUNCHING POST');

console.log('JSON_BODY:' + JSON.stringify(data));
rest.POST(url,resource, data, function(res) {
      console.log('STATUS:' + res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
      });
    });


