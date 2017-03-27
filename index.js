var express = require('express')
var app = express()
var util = require('util')
var Promise = require('bluebird');
var rp = __dirname
var fs = Promise.promisifyAll(require("fs"));
var websites = new Object();
var libxmljs = require("libxmljs");


app.set('view engine', 'hbs')


readManifests();


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
                var doc = libxmljs.parseXml(data);
                var domainid = doc.get('//domain');
                websites[domainid.text()] = doc;
            })

        }
    })


}

// TEMPORARY LOG AREA
console.log(rp);
