const helpModel = require('../models/Help');

module.exports.helpController = async (req, res) => {
    const {username, message} = req.body;
    await helpModel.create({username, message});
    res.status(201).send({
        success: true
    })
}