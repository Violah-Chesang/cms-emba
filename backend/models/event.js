const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title : {type: String, required: true, unique: true},
    eventDate : {type: Date, required: true},
    leaderInCharge : {type: String, required: false, unique: false},
    timeline : {type: Number, required: true, unique: false},
    deleted: {type: Boolean, default: false}
},
{
    timestamps : true 
}
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;