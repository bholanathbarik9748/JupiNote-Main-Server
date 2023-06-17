const mongoose = require('mongoose');

const notesModel = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "title is required"]
    },
    title: {
        type: String,
        required: [true, "title is required"]
    },
    topic: {
       type: String, 
       default: "None"
    },
    body: {
       type: String,
       required: [true, "Body is required"] 
    },
    url: {
       type: String,
       default: "None"
    },
    isActive: {
        type: Boolean,
        default : true
    }
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const notesSchemaModel = mongoose.model('notes', notesModel, 'notes');
module.exports = notesSchemaModel;
