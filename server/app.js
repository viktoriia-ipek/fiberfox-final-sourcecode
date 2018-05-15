var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

var conString = require('./config/settings').dbConfig;
sql.conString = conString;

// bodyParser for processing http request responses
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure cross origin request sharing to allow dev server
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// run on port:3000
var port = process.env.PORT || 3000;
app.set('topSecret', 'top-s3cretstring'); // secret variable

// require routes
var routes = require('./app/routes/router')(app);
app.use(routes);

// start server
app.listen(port);
console.log('App is running on port: ' + port);