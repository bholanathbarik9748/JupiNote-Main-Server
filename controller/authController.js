const UserModel = require('../models/authUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cryptr = require('cryptr');
const {set} = require("mongoose");
require('dotenv').config();

// Error Handler
const handlerError = (err) => {
    let errors = ""

    // user already exists
    if (err.code === 11000) {
        errors += 'This email or user id is already associated with an account.';
        return errors;
    }

    // Validation Error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors += "\n";
            errors += properties.message;
        })
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
// Token Creator
const createToken = (id) => {
    return jwt.sign({id}, process.env.AuthToken, {
        expiresIn: maxAge
    });
}

// Login 
module.exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userData = await UserModel.findOne({email});
        // verify user via email id
        if (!userData) {
            res.status(400).json({
                success: false,
                error: "You have entered an invalid email"
            })
        }

        // compare Password
        const authUser = await bcrypt.compare(password, userData.password);
        if (!authUser) {
            res.status(400).json({
                success: false,
                error: "You have entered an invalid password"
            })
        } else {
            const authToken = createToken(userData._id);
            res.cookie('authToken', authToken, {httpOnly: true, maxAge: maxAge * 1000});
            res.status(201).json({
                success: true,
                authToken: authToken,
                userData
            })
        }
    } catch (error) {
        const errorHandler = handlerError(error);
        res.status(400).json({
            success: false,
            errorHandler
        });
    }
}

// register New User
module.exports.registerNewUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const userData = await UserModel.create({username, email, password});
        const authToken = createToken(userData._id);
        res.cookie('authToken', authToken, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({
            success: true,
            authToken,
            userData
        })
    } catch (error) {
        const errorHandler = handlerError(error);
        res.status(400).json({
            success: false,
            errorHandler
        });
    }
}

module.exports.userIdValidation = async (req, res) => {
    const {username} = req.body;

    const userData = await UserModel.findOne({username});
    return res.status(201).json({
        success: true,
        userData
    })
}

module.exports.isEmailAvailable = async (req, res) => {
    const {email} = req.body;
    const isPresent = await UserModel.findOne({email});
    if (isPresent) {
        return res.send({success: true, present: true})
    }
    return res.send({success: true, present: false})
}

module.exports.updateUser = async (req, res) => {
    const {email, newEmail, password} = req.body;

    const userExists = await UserModel.findOne({email: newEmail});
    if (userExists) {
        return res.send({
            success: true,
            error: "10001"
        })
    }

    const userData = await UserModel.findOne({email});
    const authUser = await bcrypt.compare(password, userData.password);
    if (!authUser) {
        return res.send({
            success: true,
            error: "10002"
        })
    }

    await UserModel.findOneAndUpdate(
        {email},
        {$set: {"email": newEmail}}
    )
    return res.send({
        success: true,
        error: "10003"
    })
}

// Restart Password
exports.restartPassword = async (req, res) => {
    const {username, currPassword, newPassword} = req.body;
    const User = await UserModel.findOne({username});

    if (!User) {
        res.status(200).send({
            status: "false", error_code: "10001"
        })
    }

    const authUser = await bcrypt.compare(currPassword, User.password);
    if (!authUser) {
        res.status(200).send({
            status: "false", error_code: "10002"
        })
    }

    const salt = await bcrypt.genSalt();
    const new_Password = await bcrypt.hash(newPassword, salt);
    await UserModel.findOneAndUpdate({username}, {$set: {"password": new_Password}});
    res.status(200).send({
        status: "success"
    })
}

// Username Restart
exports.restartUserName = async (req, res) => {
    const {OldUsername, username, password} = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({username});
    if (user) {
        res.status(200).send({
            status: "false", error_code: "10001"
        })
    }

    const OldUser = await UserModel.findOne({username: OldUsername});
    if (OldUser) {
        res.status(200).send({
            status: "false", error_code: "10002"
        })
    }


    const authUser = await bcrypt.compare(password, OldUser.password);
    if (!authUser) {
        res.status(200).send({
            status: "false", error_code: "10003"
        })
    }
    await UserModel.updateMany({_id: OldUser._id}, {"$set": {"username": username}});
    res.status(200).send({
        status: "success"
    })
}

// Logout
module.exports.logout = (req, res) => {
    res.clearCookie('authToken')
    res.end();
}
