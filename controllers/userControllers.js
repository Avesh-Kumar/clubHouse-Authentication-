const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const {User} = require('../models/userServices')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

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
``
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
exports.logInSuccess = (req, res) => { res.render('log-in', { user: req.user }) }
//To view log-out successfully message
exports.logOutSuccess = (req, res) => { res.render('home', { title: " User log-out successfully" }) }

//To view log-out successfully message
exports.notGotMembership = (req, res) => { res.render('home', { title: " please login yourself in club house " }) }
// being admin
exports.becomeAdminship =(req,res) => {res.render('home',{title :"you became admin of club house successfully"})}
//========================== GET ALL PAGES  ===========================================================>
exports.getRegisterPage = (req, res) => {
    res.render("sign-up-form");
}

exports.getLoginPage = (req, res) => {
    res.render("log-in", { user: req.user });
}
exports.joinTheClub = (req, res) => {
    res.render("join-the-club");
}

exports.getLogout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/log-out-success");
    });
}

exports.madeAdmin = (req,res) => {
    res.render('make-admin');
}

//  =============================  All post requests ==========================================>

exports.register =  (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.render("sign-up-form", { errors: errors.array() });
            res.send();
        }
        else {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if (err) {
                    res.send('some thing happen wrong');
                }
                else {
                    try {
                        await User.create({ firstname:req.body.firstname ,lastname:req.body.lastname,
                            username: req.body.username, password: hashedPassword });
                        res.redirect('/sign-up-success');

                    } catch (e) {
                        return next(e);
                    }
                }
            });
        }
    }
// user login 
exports.login = passport.authenticate('local', {
    successRedirect: '/log-in-success',
    failureRedirect: '/log-in'
});
// // user join the club
exports.joinClub= async(req,res)=>{
  if(req.user){  
const id = mongoose.Types.ObjectId(req.user._id);
let user=await User.findById({_id:id})
if(user.username === req.body.username){
    try{
        await User.findOneAndUpdate({username:user.username},{$set:{isMember:true}});
        res.redirect('/getSuccessfullMembership')
    }catch(err){
        res.send(err)
    }
}
else{
    res.redirect('/notMember')
}

}

else{
    res.redirect('/notMember');
}
}
exports.becomeAdmin = async (req,res)=>{
 if(req.user){
    const id=mongoose.Types.ObjectId(req.user._id);
   let existUser= await User.findById({_id:id});
   if(existUser.username === req.body.username){
    try{
       let admin= await User.findOneAndUpdate({username:existUser.username},{$set:{isAdmin:true}});
        res.redirect('/becomeadmin');
    }catch(err){
        res.send(err);
    }
   }else{
    res.redirect('/notMember');
   }
 }else{
    res.redirect('/notMember');
 }
}











