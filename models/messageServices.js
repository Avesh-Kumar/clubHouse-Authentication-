const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const messageSchema= new Schema(
    {
        author:{type:String,require:true,unique:false},
        title:{type:String,require:true,unique:false},
        text:{type:String,require:true,unique:false},
        timestamp:{type:Date,default:Date.now},
        admin:{type:Boolean,enum:[true,false],default:false}
    }
);
const Message= mongoose.model("Message",messageSchema);
module.exports={Message};