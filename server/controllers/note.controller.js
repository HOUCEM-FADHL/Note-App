const Note = require("../models/note.model");
const jwt = require('jsonwebtoken')

module.exports = {
    createNote: async (req, res) => {
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            req.body.userId = decodedJwt.payload._id;
            console.log('createnote:', req.body);
            const note = await Note.create(req.body);
            res.status(201).json(note);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    getAllNotes: async (req, res) => {
        const id = req.params.userId;
        try{
            const notes = await Note.find({userId: id}).populate("userId");
            res.status(200).json(notes);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    // createNote: (req, res) => {
    //     const { title,content,isImportant } = req.body;
    //     Note.create({ title,content,isImportant })
    //     .then((note) => res.json(note))
    //     .catch((err) => res.status(500).json(err));
    // },
    // // Retrieve all products
    // getAllNotes: (req, res) => {
    //     Note.find()
    //     .then((notes) => res.json(notes))
    //     .catch((err) => res.status(500).json(err));
    // },
    getOneNote: (req, res) => {
        Note.findOne({ _id: req.params.id })
        .then((oneNote) => res.json(oneNote))
        .catch((err) => res.status(500).json(err));
    },
    
    updateNote: (req, res) => {
        Note.findOneAndUpdate(
        { _id: req.params.id },
        {
            title: req.body.title,
            content: req.body.content,
            isImportant: req.body.isImportant
        },
        { new: true, runValidators: true }
        )
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
    },

    deleteNote: (req, res) => {
        Note.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Note deleted."))
        .catch((err) => res.status(500).json(err));
    }
    
}