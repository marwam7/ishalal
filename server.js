'use strict';
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 7070;
var cors = require('cors');
var geolocation = require('geolocation');
//connecting with database
var db = mongojs('DB7:777@ds055862.mlab.com:55862/hackyourfuture?authMechanism=SCRAM-SHA-1', ['stores','stores1','ingredients']);

// Link the frontend dir to the server
app.use(express.static('frontend'));
app.use(express.static('static'));
app.use(express.static('./public')); 
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
//for CORS error of http
//app.use(function(req, res, next) { 
//   var allowedOrigins = ['http://localhost'];
//   var origin = req.headers.origin;       
//   if(allowedOrigins.indexOf(origin) > -1){ 
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }                                   
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS'); 
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');    
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

//routes
require('./app/routes.js')(app,db);

//listen

app.listen(port, function () {
    console.log('The webpage listening on port ' + port);
});
