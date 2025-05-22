const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

//function for token creation.   we can id, but in mongo is _id.
const createToken = (_id) => {
    return jwt.sign({_id:_id}, process.env.SECRET, {expiresIn: '1d'})  // 3rd argument is optional
};

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        //passing back to front
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// signup user 
const signupUser = async (req, res) => {

    const {email, password} = req.body;

    try{
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        //passing back to front
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = {loginUser, signupUser};