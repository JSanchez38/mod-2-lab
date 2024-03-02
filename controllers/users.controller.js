const User = require('../models/user.model');
const mongoose = require('mongoose');

const createError = require('http-errors');

module.exports.create = (req, res, next) => res.render('users/signup');

module.exports.doCreate = (req, res, next) => {
    User.findOne({username: req.body.username})
    .then((userFound) => {
        if (userFound) {
            res.status(409).render('users/signup', { userFound, errors: { username: 'Username already exist'}})
        } else {
            const user = req.body;
            return User.create(user)
                .then(() => res.redirect('/login'))
        }
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).render("users/signup", { user, errors: error.errors });
        } else {
            next(error);
        }
    })
}

module.exports.login = (req, res, next) => res.render('users/login');

module.exports.doLogin = (req, res, next) => {
    User.findOne({username: req.body.username})
    .then((user) => {
        if(!user) {
            res.status(401).render('users/login', { user, errors: { password: 'Invalid username or password'}})
        } else {
            return user.checkPassword(req.body.password)
                .then((match) => {
                    
                })
        }
    })
    .catch()
}