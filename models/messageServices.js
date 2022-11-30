const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const messageSchema= new Schema(
    {
        auther:{type:String,require:true,unique:false},
        title:{type:String,require:true,unique:false},
        text:{type:String,require:true,unique:false},
        timestampe:{type:Date,default:Date.now}
    }
);
const Message= mongoose.model("Message",messageSchema);
module.exports={Message};