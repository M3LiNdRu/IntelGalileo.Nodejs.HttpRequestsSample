/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var winston = require('winston');
winston.add(winston.transports.File, { filename: '/node_app_slot/app.log' });
winston.remove(winston.transports.Console);

var rest = require('./restHelper');
var ipHelper = require('./ipHelper');
var tempHelper = require('./tempHelper');

winston.info('Starting program'); 

periodicActivity(); //call the periodicActivity function

winston.info('Finish program'); 

function periodicActivity()
{
    winston.info('Starting iteration');

    var url = 'URL;
    var resource = 'RESORUCE';
    var data = {
        'Name':'Intel_Galileo_Gen2', 
        'Description': 'Hello :)',
        'Ip': '127.0.0.1',
        'Meta': { 
            'Temperature': 0.0,
            'Humidity': 0.0
        }
    };
    
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
    
    winston.info('GETTING LOCAL IP ADDRESS');

    ipHelper.localip(function(result) {
        console.log('IP: ' + result);
        if (result != null && result.length > 0) data.Ip = result[0]; 
    });

    winston.info('GETTING TEMPERATURE');

    tempHelper.temp(function(result) {
        console.log('Temp: ' + result);
        if (result != null) data.Meta.Temperature = result; 
    });

    winston.info('LAUNCHING POST');

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

process.on('uncaughtException', function (err) {
  winston.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  winston.error(err.stack)
  process.exit(1)
})

