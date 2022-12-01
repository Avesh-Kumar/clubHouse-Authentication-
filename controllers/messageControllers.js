const mongoose= require('mongoose');
const { Message } = require('../models/messageServices');
const messageDB = require('../models/messageModel')

//=====================================page rendering========================>
exports.getMessageForm = (req, res) => {
    res.render('create-a-message');
}
//To view log-out successfully message
exports.getMembership = (req, res) => { res.render('create-a-message', { title: " you got  successfully membership" }) }
exports.notAdmin = (req,res) =>{ res.render('home' ,{title:"you are not admin of club house"})}
//=================================> get notifications===============================>
exports.successMessage = (req, res) => { res.render('create-a-message', { title: 'message save' }) }

exports.getAllAuthers = (req, res) => {
    var data = Message.find({});
    console.log(data)
    res.send(data);
}

//=======================================post request================================>
exports.createMessage = async (req, res) => {
    // console.log(req.user.username);
    try {
        await Message.create({ author: req.user.username, title: req.body.title, text: req.body.text });
        res.redirect('/success-message');
    } catch (err) {
        res.send(err);
    }
}




//======================================get /delete /update =========================================>
exports.allMembers = async (req, res) => {
    const members = await messageDB.getMessages();
    res.render("dataOnHome",{members});
    // res.send(members)
}

exports.allMessages =async (req,res) =>{
  try{
    const members= await Message.find({},{title:1,author:1,timestamp:1,_id:1,text:1});
    console.log(members);
    res.render("memberRead",{members});
  }catch(err){
    res.send(err);
  }
}
exports.getmessagesofAdmin= async(req,res) =>{
    try{
    const members= await Message.find({});
    res.render('admin',{members});
    }catch(err){
        res.send(err);
    }
}
exports.deleteMessagesByAdmin = async(req,res) =>{
    console.log(req.user);
    if(req.user){
      if(req.user.isAdmin === true){
        try{
        await Message.deleteOne({});
        res.redirect('/getanddelete');
        }catch(err){
           res.send(err);
        }
      }
      else{
           res.redirect('/notadmin');
      }

    }else{
        res.redirect('/notMember')
    }
}