const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    //verify auth from headers prop.
    const {authorization} = req.headers   // "Bearer dkadjais.djasndjan.ghuebfyfab"

    if(!authorization) {
        return res.status(401).json({error: 'Authorization required!'})
    }

    const token = authorization.split(' ')[1];

    //check tampering
    try{
        const {_id} = jwt.verify(token, process.env.SECRET)   //returning payload of token, so we are getting _id of it 
        req.user = await User.findOne({_id})//.select('_id')  // attaching user property to req, so we have it onwards (just _id). so user with just id prop if select().
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request not authorized!'})
    }
};

module.exports = {requireAuth};