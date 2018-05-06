const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email', passwordField: 'password' } // since we're using email instead of username
const localLogin = new LocalStrategy(localOptions , function(email, password, done) {
    // verify this username and password
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        // compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }

            if (!isMatch) { return done(null, false); }

            return done(null, user);
        })
    });
});

// setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
};

// creat JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // check if user id in the payload exists in database
    User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

// have passport use this strategy
passport.use(jwtLogin);
passport.use(localLogin);