var express = require('express');
var userController = require('../controllers/userControllers');
var messageController = require('../controllers/messageControllers');
const {Message}=require('../models/messageServices');
// var signUp=require('../middleware/signUp');
const {User}=require('../models/userServices')
const {check}=require('express-validator')
var router = express.Router();
//=================================> ALL USER CONTROLLER ================================>

// ====================================   ALL GET REQUEST ===============================>

// To get sign-up form 
router.get("/sign-up", userController.getRegisterPage);
// To get login form
router.get("/log-in", userController.getLoginPage);
// USER LOGOUT PAGE
router.get("/log-out", userController.getLogout);
// USER JOIN THE CLUB PAGE
router.get("/join-the-club", userController.joinTheClub);
// USER MADE ADMIN
router.get('/admin',userController.madeAdmin)
//========================= VIEW PAGES ====================================================>
// To view home page 
router.get("/", userController.home);
// To view sign-up-success
router.get('/sign-up-success', userController.signUpSuccess);
// To view log-in-success
router.get('/log-in-success', userController.logInSuccess);
// To view log-out-success
router.get('/log-out-success', userController.logOutSuccess);

// To view you are not member of club house
router.get('/notMember', userController.notGotMembership);
// To view you are admin of club house
router.get('/becomeadmin', userController.becomeAdminship);

// ===============================  ALL POST REQUEST ====================================>

//To register new user in database

router.post("/sign-up",[
    check('username').trim().normalizeEmail().escape().notEmpty().isEmail()
        .withMessage('please enter a valid mail').custom(value => {
            return User.findOne({ username: value }).then(user => {
                if (user) {
                    return Promise.reject(' username is already exist');
                }
            });
        }),
    
    check('password').trim().notEmpty().withMessage('please enter password'),
    check('cpassword').notEmpty().trim()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            return Promise.reject('password not matched ');
        }
        return true;
    })
   ] ,userController.register);
// USER LOG-IN
router.post("/log-in", userController.login);
// USER JOIN CLUB
router.post("/joinclub", userController.joinClub);
router.post('/makeadmin',userController.becomeAdmin);

//=========================================> ALL MESSAGE CONTROLLERS =================================>

//========================== TAKE VIEWS PAGES====================================================>
router.get('/create-message',messageController.getMessageForm);
router.get('/amit',messageController.getAllAuthers);


//================================ SUCCESS/FAILURE PAGES============================================>
router.get('/success-message',messageController.successMessage);
// To view get successfully join the club
router.get('/getSuccessfullMembership', messageController.getMembership);
router.get('/notadmin', messageController.notAdmin);

//==================================post req  =======================================================>
router.post('/create-messages',messageController.createMessage);


//======================all get/update/delete request ==================================================>
router.get('/getAllMembers',messageController.allMembers);
router.get('/getAllMessage',messageController.allMessages);
router.get('/getanddelete',messageController.getmessagesofAdmin);
router.post('/deletemessage',messageController.deleteMessagesByAdmin);





module.exports = router;