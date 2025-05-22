const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static signup method creating, also here i am goind to validate
userSchema.statics.signup = async function (email,password) {
    // validation
    if(!email || !password) {
        throw Error('All fields must be filled !')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {  // min 8 char, Upper, Lower, number and symbol.
        throw Error('Pssword not strong enough. min 8 char, Upper, Lower, number and symbol.')
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    };

    // hashing pass... bcrypt dodaje Salt, pa 2 iste sifre su razlicite na kraju
    const salt = await bcrypt.genSalt(10); //default number 10
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password : hash}) //passing the value of hash to password

    return user

};

// static login method creating
userSchema.statics.login = async function (email,password) {
    // validation
    if(!email || !password) {
        throw Error('All fields must be filled !')
    };
    const user = await this.findOne({email});

    if (!user) {  // if cannot find one with that name, it is not registered.
        throw Error('Incorrect email!')
    };

    const matchPass = await bcrypt.compare(password, user.password);

    if(!matchPass) {
        throw Error('Incorrect password!')
    };

    return user;
}
module.exports = mongoose.model('UserModel', userSchema);