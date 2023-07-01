// Import Library
const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');
const noteController = require('../controller/noteController');

// Routers Post
router.post('/v1/notes/new', noteController.createNewNotes);
router.post('/v1/notes/update',noteController.updateNotes);

// Routers get
router.get('/v1/notes/all/:username', noteController.retrieveNotes);
router.get("/v1/delete/notes/all/:username",noteController.deleteNoteList)

// Routers patch
router.patch('/v1/notes/:id', noteController.deleteNotes);
router.patch('/v1/restore/notes/:_id', noteController.RestoreNote);
router.patch('/v1/delete/notes/:_id', noteController.PermanentlyDeleteNote);

// Export Module
module.exports = router;