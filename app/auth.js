'use strict';
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var UserModel = require('./models/user');

function findOrCreate ( profile, cb ) {    
    UserModel.findOrCreate({username: profile.username}, profile, cb);
}

function parserProfile ( profile ) {
    if(profile.provider=="twitter")
        return {
            username : profile.username,
            avatarUrl: profile.photos[0].value
        };
}

exports.PassportAuth = function ( app, passport ) {
    /*passport.use(new FacebookStrategy({
        clientID: passport.FacebookId,
        clientSecret: passport.FacebookSecret,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {        
          findOrCreate(profile, done);
    }));*/

    passport.use(new TwitterStrategy({
        consumerKey: app.get('TwitterId'),
        consumerSecret: app.get('TwitterSecret'),
        callbackURL: "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {   
        profile = parserProfile( profile ); 
        findOrCreate(profile, done);
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function( id , done) {
        UserModel.findOne({ '_id': id }, done);
    });
};
