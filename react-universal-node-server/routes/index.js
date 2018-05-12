const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {

    app.get('/', requireAuth, function(req, res, next) {
        let user = {
            email: req.user.email,
        }
        res.json({ user: user })
    });

    app.get('/test', function(req, res, next) {
        res.send("test");
    })

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
}

