var express = require('express')
var app = express()
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.send('WTF')
})
 
app.listen(3000)
