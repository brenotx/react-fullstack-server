const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const Users = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, cb) => {
            new Users({ googleId: profile.id }).save();
            // User.findOrCreate({ googleId: profile.id }, function(err, user) {
            //     return cb(err, user);
            // });
        }
    )
);
