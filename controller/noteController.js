// import Library or Model
const Cryptr = require('cryptr');
const notesModel = require('../models/noteData');
require('dotenv').config();

// Set SecretKey Code
const cryptr = new Cryptr(process.env.cryptrToken, {pbkdf2Iterations: 10000, saltLength: 10});

// create new Note 
module.exports.createNewNotes = async (req, res) => {
    const {username, title, topic, body, url} = req.body;
    try {
        const newNotes = await notesModel.create({username, title, topic, body, url});
        res.status(200).json({
            success: true,
            newNotes
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            newNotes
        })
    }
}

// Retrieve all Note 
module.exports.retrieveNotes = async (req, res) => {
    const {username} = req.params;
    let allNotes = await notesModel.find({username, isActive: true});
    res.json({
        allNotes
    })
}

// Delete Notes
module.exports.deleteNotes = async (req, res) => {
    const {id} = req.params;
    const deleteNote = await notesModel.findOneAndUpdate(
        {_id: id},
        {$set: {isActive: false}}
    )
    console.log(deleteNote);
    res.send({success: true});
}

//Edit Notes
module.exports.updateNotes = async (req, res) => {
    const {id, title, topic, body, url} = req.body;
    const updatedData = await notesModel.findOneAndUpdate(
        {_id: id},
        {$set: {title: title, topic: topic, body: body, url: url, isActive: true}}
    )

    console.log(updatedData);
    res.send({success: true});
}

//Deleted Notes
module.exports.deleteNoteList = async (req, res) => {
    const {username} = req.params;
    let allNotes = await notesModel.find({username, isActive: false});
    res.json({
        allNotes
    })
}

// Restore Notes
module.exports.RestoreNote = async (req, res) => {
    const {_id} = req.params;
    console.log(req.params);
    await notesModel.findOneAndUpdate(
        {_id},
        {$set: {isActive: true}}
    );

    res.status(201).json({
        success: true,
    })
}