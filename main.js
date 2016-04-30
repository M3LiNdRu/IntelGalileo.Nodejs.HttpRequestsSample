/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

process.on('uncaughtException', function (err) {
  winston.error('uncaughtException:', err.message)
  winston.error(err.stack)
  process.exit(1)
});

var config = require('./config');
var winston = require('winston');
winston.add(winston.transports.File, { filename: config.LOGFILE });
winston.remove(winston.transports.Console);

var rest = require('./restHelper');
var ipHelper = require('./ipHelper');
var tempHelper = require('./tempHelper');

winston.info('Starting program'); 

//Initiating values

var url = config.URL;
var resource = config.RESOURCE;
var data = {
    'Name':'Intel_Galileo_Gen2', 
    'Description': 'Hello :)',
    'Ip': '127.0.0.1',
    'Meta': {   
        'Temperature': 0.0,
        'Humidity': 0.0
    }
};

winston.info('1. GETTING LOCAL IP ADDRESS');

ipHelper.localip(function(result) {
    console.log('IP: ' + result);
    if (result != null && result.length > 0) data.Ip = result[0]; 
});

function periodicActivity()
{
    winston.info('Starting iteration');
    
/*
    winston.info('LAUNCHING GET');

    rest.GET(url, resource, function(res) {
          console.log('STATUS:' + res.statusCode);
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
          });
        });
*/

    winston.info('2. GETTING TEMPERATURE');

    tempHelper.temp(function(result) {
        console.log('Temp: ' + result);
        if (result != null) data.Meta.Temperature = result; 
    });

    winston.info('3. LAUNCHING POST');

    console.log('JSON_BODY:' + JSON.stringify(data));
    rest.POST(url,resource, data, function(res) {
          console.log('STATUS:' + res.statusCode);
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
          });
        });

    winston.info('Iteration finished');
    setTimeout(periodicActivity,300000); //call the indicated function after 1 second (1000 milliseconds)
}

periodicActivity(); //call the periodicActivity function

winston.info('Finish program'); 