const {Message} = require('./messageServices')

module.exports.getMessages = ()=>{
    return new Promise((resolve) => {
        Message.find({},{title:1,author:1,timestamp:1,_id:1,text:1},(err, result)=>{
            if(err) throw err;
            else{
                resolve(result);
            }
        })
    })
}