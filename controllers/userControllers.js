const bcrypt = require('bcryptjs')
const {body,validationResult}=require('express-validator');
const User = require('../models/userServices')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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


//===================  ALL VIEW PAGES RENDERING  =====================================================>
//To view home page
exports.home = (req, res) => { res.render('home', { title: "welcome to my club house App" }); }
//To view sign-up successfully message
exports.signUpSuccess = (req, res) => { res.render('home', { title: "New user registered successfully" }) }
//To view log-in successfully message
exports.logInSuccess = (req, res) => { res.render('log-in', { user:req.user}) }
//To view log-out successfully message
exports.logOutSuccess = (req, res) => { res.render('home', { title: " User log-out successfully" }) }

//========================== GET ALL PAGES  ===========================================================>
exports.getRegisterPage = (req, res) => {
    res.render("sign-up-form");
}

exports.getLoginPage = (req, res) => {
    res.render("log-in", { user: req.user });
}

exports.getLogout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

//  =============================  All post requests ==========================================>

exports.register =  (req, res, next) => {
     bcrypt.hash(req.body.password, 10,async(err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        else {
            try{
                await User.create({username:req.body.username,password:hashedPassword});
                res.redirect('/sign-up-success');

            }catch(e){
                req.next(e);
            }
        }
    });
}

exports.login = passport.authenticate('local', {
    successRedirect: '/log-in-success',
    failureRedirect: '/log-in'
})



