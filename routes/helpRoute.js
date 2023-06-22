// Import Library
const {Router} = require('express');
const router = Router();

// Import Controller
const Controller = require('../controller/helpController')

// Routers post
router.post('/v1/help', Controller.helpController);

// Export Module
module.exports = router;