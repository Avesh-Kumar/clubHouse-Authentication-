const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, required: false },
    password: { type: String, required: false }
});
module.exports = mongoose.model("User", UserSchema);