const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstname: { type: String, required: true ,unique:false},
    lastname: { type: String, required: true ,unique:false},
    username: { type: String, required: true ,unique:true},
    password: { type: String, required: true,unique:false},
    isMember: { type: Boolean,enum :[true,false],default:false}
});

const User = mongoose.model("User", UserSchema);
module.exports = {User}