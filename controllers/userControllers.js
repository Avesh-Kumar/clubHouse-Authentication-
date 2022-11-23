const User = require('../models/userServices')
const bcrypt = require('bcryptjs')
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// : setting up the LocalStrategy 
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            bcrypt.compare(password, user.password, (err, res) => { 
                if (res) { 
                  // passwords match! log user in 
                  return done(null, user) 
                } else { 
                  // passwords do not match! 
                  return done(null, false, { message: "Incorrect password" }) 
                } 
              })
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

exports.getRegisterPage = (req, res) => {
    res.render("sign-up-form");
}
exports.getLoginPage = (req, res) => {
    res.render("log-in", { user: req.user });
}
exports.register = async (req, res, next) => {
    await bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        else {
            const user = {};
            user.username= req.body.username;
            user.password= hashedPassword;
            User.create(user);
            res.render('success')
        }
    });
}

exports.login = (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
}

exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}
