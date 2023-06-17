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

// Routers patch
router.patch('/v1/notes/:id', noteController.deleteNotes);

// Export Module
module.exports = router;