'use strict';

var passport = require('passport');
var indexController = require('../controller/index');

var logoutController = function(req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = function(app) {
    app.get('/', indexController);

    app.get('/logout', logoutController);
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
};