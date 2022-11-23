var express = require('express');
var userController=require('../controllers/userControllers')
var indexController=require('../controllers/indexControllers')
var router = express.Router();

// To get sign-up form 
router.get("/sign-up", userController.getRegisterPage);
// To get login form
router.get("/log-in", userController.getLoginPage);
//To register new user in database
router.post("/sign-up", userController.register);

// USER LOG-IN
router.post("/log-in", userController.login);

// USER LOGOUT PAGE
router.get("/log-out",userController.logout);

//To  show success page
router.get("/success", indexController.success);

/* GET home page. */
router.get('/',indexController.index);

module.exports = router;
