/* 
ipHelper Module
Author: M3LiNdRu
Date: 09/04/2016
*/

//External Modules
var mraa = require('mraa'); //require mraa
var N = 100;

exports.temp = function(callback) {
    
    var analogPin = new mraa.Aio(4); 
    
    var analogValue = analogPin.read();
    
    for(var i = 1; i < N; i++) {
        analogValue += analogPin.read();
    }
    
    analogValue /= N;
    analogValue *= 0.48826125;

    callback(Math.round(analogValue * 10) / 10);    
}

