const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

// Define our user model
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: String,
});
// On save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;

    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }
        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) { return next(err); }
            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    })
}
// Create the user model class
const model = mongoose.model('user', userSchema);
// Export the user model
module.exports = model;