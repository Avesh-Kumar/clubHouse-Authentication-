const { mongoose } = require('mongoose');
const { Message } = require('../models/messageServices');

//=====================================page rendering========================>
exports.getMessageForm = (req, res) => {
    res.render('create-a-message');
}


//=================================> get notifications===============================>
exports.successMessage = (req, res) => { res.render('home', { title: 'message save' }) }

exports.getAllAuthers = (req,res) => {
    const data= Message.find({});
    console.log(data)
    res.send(data);
}

//=======================================post request================================>
exports.createMessage = async (req, res) => {
    // console.log(req.user.username);
    try {
        await Message.create({ auther: req.user.username, title: req.body.title, text: req.body.text });
        res.redirect('/success-message');
    } catch (err) {
        res.send(err);
    }
}