const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title : {type: String, required: true, unique: true},
    eventDate : {type: Date, required: true},
    endOfEventDate: {type: Date, required: false},
    leaderInCharge : {type: String, required: false, unique: false},
    targetAudience:{type:String, required:false, unique:false},
    location:{type:String, required:false, unique:false},
    eventLevel:{type:String, required:false, unique:false},
    daysTo : {type: Number, required: true, unique: false},
    deleted: {type: Boolean, default: false}
},
{
    timestamps : true 
}
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;