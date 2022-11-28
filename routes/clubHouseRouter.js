var express = require('express');
var userController = require('../controllers/userControllers')
var router = express.Router();

// ====================================   ALL GET REQUEST ===============================>

// To get sign-up form 
router.get("/sign-up", userController.getRegisterPage);
// To get login form
router.get("/log-in", userController.getLoginPage);
// USER LOGOUT PAGE
router.get("/log-out", userController.getLogout);

//========================= VIEW PAGES ====================================================>
// To view home page 
router.get("/", userController.home);
// To view sign-up-success
router.get('/sign-up-success', userController.signUpSuccess);
// To view log-in-success
router.get('/log-in-success', userController.logInSuccess);
// To view log-out-success
router.get('/log-out-success', userController.logOutSuccess);


// ===============================  ALL POST REQUEST ====================================>

//To register new user in database

router.post("/sign-up", userController.register);
// USER LOG-IN
router.post("/log-in", userController.login);



module.exports = router;
