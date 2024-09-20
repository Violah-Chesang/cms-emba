const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post('/user/register', async (req, res) => {
    try{
        // extract req.body info
        const {firstname, lastname, userName, email, password, role} = req.body;
        if(!(firstname, lastname, userName, email, password, role)){
            res.status(400).json({message : "Please enter all the required information"})
        }

        const oldUser = await User.findOne({email})
        if(oldUser){
            res.json({message: "Member already registered!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = new User({
            firstname,
            lastname,
            userName,
            email,
            password : hashedPassword,
            role
        });

        newUser.save();
        res.status(201).json({message: "Member Registered!", data: newUser});

    }catch(err){
        res.status(500).json({message: "Error registering user!", error: err})
    }
});

router.post('/user/login', async(req, res) => {
    try{
        const {userName, password} = req.body;

        if(!(userName && password)){
            res.status(401).json({message: "Please enter your Username and Password!"});
        }
    
        const userInDb = await User.findOne({userName});
        if(!userInDb){
            res.json({message: "User not found in DB"});
        }
        const passInDb = userInDb.password;
        
        const isCorrectPass =await bcrypt.compare(password, passInDb);
        if(isCorrectPass){
            //generate and sign a valid web token then verify them 
            // we need username to sign the data, have a secret key in .env and options to expire in 2 hr
            const tokenData = {
                "name" : userInDb.userName,
                "userType" : userInDb.role
            }
            const signedToken = jwt.sign(tokenData, process.env.jwt_secret, {expiresIn : '1h'});
            const data = {
                'token' : signedToken
            }


            res.status(200).json({message: "Successfully logged in", data: data});
        }else{
            res.status(401).json({message: "Passwords do not match!"});
        }

    }catch(err){
        console.error("Error during login: ", err);
        res.status(500).json({message: "Internal Server Error", error: err});
    }

});

// get a user
router.post('/get-user',async (req,res)=> {
    const userName = req.body.userName;
    const user = await User.findOne({userName})
    if(!user){
        res.json({message:"user not found!"});    
    }

    res.status(200).json(user);
    
    
})

module.exports = router;