const mongoose = require('mongoose');

function connectToDb(){
    const url = process.env. DB_URL;

    mongoose.connect(url);
    let db = mongoose.connection; 

    db.once('open', (event) => {
        console.log('Connection to the db successful!')
    });

    db.on('Error', (err)=>{
        console.log("Error connecting to the db.", err);
    });

    const memberModel = require('../models/member');
    const counterModel = require('../models/counter');
    const userModel = require('../models/user');
    const eventModel = require('../models/event');
    
    return db;
}

module.exports = connectToDb;