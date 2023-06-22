const mongoose = require('mongoose');

const HelpModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "title is required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    }
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const HelpSchemaModel = mongoose.model('help', HelpModel, 'help');
module.exports = HelpSchemaModel;
