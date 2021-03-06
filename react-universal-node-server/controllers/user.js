const User = require('../models/user');

exports.fetchUsers = (req, res, next) => {
    // finds all user data and select which fields to exclude
    User.find({}, '-password -_id -__v', function(err, users) {
        
        try {
            res.json({ users: users});
        } catch (err) {
            res.send("Error fetching the users from the database")
            next();
        }
    })
}

exports.deleteUser = (req, res, next) => {

    let userId = req.user._id;
    // find user by specific id and delete them
    User.findByIdAndRemove(userId, function(err, user) {
        try {
            const response = {
                message: "User successfully deleted",
                id: user._id
            };
            // response with a message 
            return res.status(200).send(response);
        } catch(err) {
            throw err;
        }
    })
}

exports.fetchUser = (req, res, next) => {
    
    try {
        let user = {};
        if (req.user.local.email) {
            user.email = req.user.local.email
        } else if (req.user.google.email) {
            user.email = req.user.google.email
        }
        res.json({ user: user })
    } catch (err) {
        throw err;
    }
}

exports.updateUser = (req, res, next) => {
    let userId = req.user._id;
    
    User.findByIdAndUpdate(userId, req.body, {new: true}, function(err, user) {
        try {
            const response = {
                message: "User successfully updated their information",
                id: user._id
            };
            // response with a message 
            return res.status(200).send(response);
        } catch (err) {
            throw err;
        }
    })
}