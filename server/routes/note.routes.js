const NoteController = require("../controllers/note.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/notes", authenticate ,NoteController.createNote);
    app.get("/api/notes/:userId", authenticate, NoteController.getAllNotes);
    app.get("/api/note/:id", authenticate, NoteController.getOneNote);
    app.patch("/api/note/:id/edit", authenticate, NoteController.updateNote);
    app.delete("/api/note/:id", authenticate, NoteController.deleteNote);
}