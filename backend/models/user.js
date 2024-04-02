const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    firstname : {type: String, required: true, unique: false},
    lastname : {type: String, required: true, unique: false},
    email: {type: String, required: true},
    deleted: {type: Boolean, default: false},
    role: {type: String, default: "Normal", required: true}
},
{
    timestamps : true 
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;