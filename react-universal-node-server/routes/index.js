const Authentication = require('../controllers/authentication');
const UserController = require('../controllers/user');
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

    app.get('/admin', requireAuth, Authentication.requireAdmin, function(req, res, next) {
        let role = {
            isAdmin: true,
            role: req.user.role,
        }
        res.json({ role: role })
    });

    app.get('/user', requireAuth, UserController.fetchUser);

    app.delete('/user', requireAuth, UserController.deleteUser);

    app.get('/users', requireAuth, Authentication.requireAdmin, UserController.fetchUsers)

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);

}

