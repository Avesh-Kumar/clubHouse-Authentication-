var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()
// const session = require("express-session"); 
// const passport = require("passport"); 
// const LocalStrategy = require("passport-local").Strategy; 
const mongoose = require("mongoose");
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
//ROUTER MIDDLEWARE
var clubHouseRouter = require('./routes/clubHouseRouter')
//CREATE EXPRESS OBJECT
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
//connect mongoose
const mongoDb = `mongodb+srv://AveshKumar:${process.env.password}@cluster0.7teqadp.mongodb.net/clubHouse?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
// app.use(session({ secret: "cats", resave: false, saveUninitialized: true })); 
// // : setting up the LocalStrategy 
// passport.use( 
//   new LocalStrategy((username, password, done) => { 
//     User.findOne({ username: username }, (err, user) => { 
//       if (err) {  
//         return done(err); 
//       } 
//       if (!user) { 
//         return done(null, false, { message: "Incorrect username" }); 
//       } 
//       if (user.password !== password) { 
//         return done(null, false, { message: "Incorrect password" }); 
//       } 
//       return done(null, user); 
//     }); 
//   }) 
// ); 

// passport.serializeUser(function(user, done) { 
//   done(null, user.id); 
// }); 

// passport.deserializeUser(function(id, done) { 
//   User.findById(id, function(err, user) { 
//     done(err, user); 
//   }); 
// });

// app.use(passport.initialize()); 
// app.use(passport.session()); 
// app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/', clubHouseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


