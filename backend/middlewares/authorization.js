const express = require('express');
const jwt = require('jsonwebtoken');

const authorizeUser =(req, res, next) => {
    // Check the if there's a valid JWT_token and if the user has the rights to access the protected route

    const {token} = req.headers;
    if(!token){
        res.status(401).json({message: "Access Denied!"});
    }

    console.log(token);

    const verifiedToken = jwt.verify(token, process.env.jwt_secret);
    if(!verifiedToken){
        res.status(401).json({message: "Access Denied!"});
    }

    next();

}

module.exports = authorizeUser;