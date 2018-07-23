const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) });
}

exports.googleSignin = (req, res, next) => {
    console.log('google signin')
    console.log(tokenForUser(req.user))
    
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const role = req.body.role;
    
    if (!email || !password) { 
        return res.status(422).send({ error: 'Please enter in an email and password' }); 
    }

    User.findOne({ 'local.email' : email }, function(err, existingUser) {
        if (err) { return next(err); }

        // if a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use already' }); 
        }

        // if a user with email does not exist, create and save user record
        const user = new User();
        user.local.email = email
        user.local.password = password
        user.phone = phone
        user.role = role ? role : "USER"

        user.save((err) => {
            if (err) { return next(err); }
            // respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
}

exports.requireAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role !== 'ADMIN') {
        return res.status(422).send({ error: 'User does not have admin access'});
    }
    next();
}