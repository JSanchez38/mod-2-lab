const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,      
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password needs at least 5 characters']
    },
    avatarUrl: {
        type: String,
        default: 'https://i.pravatar.cc/150?u=iron-fake@pravatar.com'
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, 5)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch(next);
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;


