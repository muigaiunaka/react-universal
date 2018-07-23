const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

// Define our user model
const userSchema = new Schema({
    local: {
        email: { 
            type: String, 
            unique: true, 
            lowercase: true, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
        },
        password: { 
            type: String,
            minLength: 5,
        },
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['USER', 'ADMIN'], 
        default: "USER"
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          }, message: '{VALUE} is not a valid phone number!'
        },
        // required: [true, 'User phone number required']
    },
});
// On save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;
    console.log("encrypting saved users password")
    // generate a salt then run callback
    if (user.local.password) {
        console.log("local sign up")
        bcrypt.genSalt(10, function(err, salt) {
            if (err) { return next(err); }
            // hash (encrypt) our password using the salt
            bcrypt.hash(user.local.password, salt, function(err, hash) {
                if (err) { return next(err); }
                // overwrite plain text password with encrypted password
                user.local.password = hash;
                next();
            })
        })
    } else {
        console.log("User is signing up using some other auth method, i.e. Google Auth")
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    })
}
// Create the user model class
const model = mongoose.model('user', userSchema);
// Export the user model
module.exports = model;