const mongoose = require("mongoose"); // mongo itself is Schema-less

const Schema = mongoose.Schema; //Creating Schema to define the structure of a model

//passing object as argument, how it should look
const predictionSchema  = new Schema({
    stock : {
        type: String,
        required : true,
        trim: true,
        set: value => value.toUpperCase()
    },
    price_Prediction : {
        type: String,
        required : true,
        trim: true,
        set: value => value.toLowerCase()
    },
    comment : {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps:true}); // automatski da doda created at...

module.exports = mongoose.model('predictionModel', predictionSchema);

//predictionModel.find(); // find all of prediction in prediction collection