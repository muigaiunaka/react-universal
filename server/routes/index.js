const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {

    app.get('/', requireAuth, function(req, res, next) {
        res.json({"water": "wet", "monkey": "pet", "secret": "topsecret"})
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
}

