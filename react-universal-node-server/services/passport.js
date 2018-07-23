const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const localOptions = { usernameField: 'email', passwordField: 'password' } // since we're using email instead of username
const localSignin = new LocalStrategy(localOptions , function(email, password, done) {
    // verify this username and password
    User.findOne({ 'local.email': email }, function (err, user) {
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

// create JWT strategy
const jwtSignin = new JwtStrategy(jwtOptions, function(payload, done) {
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

const googleSignin = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    let gmail = profile.emails[0].value
    User.findOne({ 'google.id': profile.id }, function (err, user) {

        if (user) {
            done(null, user);
        } else if (!user) {
            let newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.google.email = gmail;
            newUser.google.name = profile.displayName;

            newUser.save((err) => {
                if (err) { return done(err); }
                // res.json({ newUser })
                done(null, user)
            })
        } else {
            console.log("errors???")
            done(null, false);
        }
        
    })
  }
);

// have passport use this strategy
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    let id = user._id
    User.findById(id).then(user => {
		done(null, user);
	});
});
passport.use(jwtSignin);
passport.use(localSignin);
passport.use(googleSignin)

// passport.use(initialize());