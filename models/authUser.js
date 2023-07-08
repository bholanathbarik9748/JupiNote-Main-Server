const mongoose = require('mongoose');
var { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        lowercase: true,
        validate: [isEmail, "Invalid email"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password must be more then or equal 6 character"]
    },
},{
  collection: 'user'
}, {timestamps: true})

// Hash Password 
user.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const userSchemaModel = mongoose.model('user', user, 'user');
module.exports = userSchemaModel;