const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [2, "{PATH} must be at least 2 characters long"]
    },
    content: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [2, "{PATH} must be at least 2 characters long"]
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema)
