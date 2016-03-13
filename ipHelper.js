/* 
ipHelper Module
Author: M3LiNdRu
Date: 13/03/2016
*/

//External Modules
var os = require('os');

exports.localip = function(callback) {

    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    callback(addresses);
    
}