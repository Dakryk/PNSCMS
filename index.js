var express = require('express')
var app = express()
var util = require('util')
var Promise = require('bluebird');
var rp = __dirname
var fs = Promise.promisifyAll(require("fs"));
var websites = new Object();
var libxmljs = require("libxmljs");
var QAPI = new Object();
var SBCache = require("smartbridge_cache");
var SBRouting = require("smartbridge_routing");
var parseString = require('xml2js').parseString;

QAPI.utils = require("smartbridge_utilities");
app.set('view engine', 'hbs')


readManifests();
global.maindir = rp;

app.get('/', function (req, res) {
    var hostname = req.headers.host;
    res.send('WTF')

})

app.listen(3000)


function readManifests() {
    var path = rp + "/websites/";
    fs.readdirAsync(path).then(function (data) {
        for (var n = 0; n < data.length; n++) {

            var manifesto = path + data[n] + '/manifest.xml';
            fs.readFileAsync(manifesto).then(function (data) {
                parseString(data, function (err, result) {
        var r = result.configuration.routing[0].routes;
        var rcnt = r.length;
                    
                    for (var u = 0; u < rcnt; u++){
        var p = result.configuration.routing[0].routes[u].route;
                        console.log(p);
                    }
            
//    console.dir(result.configuration.routing[0].routes[0].route);
});
            
        
        //        SBRouting.buildroutes(doc);
            })

        }
    })


}

// TEMPORARY LOG AREA
console.log(rp);
SBCache.testrun();



  debugger;

