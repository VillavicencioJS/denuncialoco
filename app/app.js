'use strict';

var path     = require('path');
var auth     = require('./auth');
var express  = require('express');
var session  = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = module.exports = express();


app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.set('view cache', false);
/* env */
app.set('TwitterId', process.env.TwitterId);
app.set('TwitterSecret', process.env.TwitterSecret);
app.set('FacebookId', process.env.FacebookId);
app.set('FacebookSecret', process.env.FacebookSecret);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'SECRET', 
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express.static(__dirname + "/../public"));

auth.PassportAuth(app, passport);