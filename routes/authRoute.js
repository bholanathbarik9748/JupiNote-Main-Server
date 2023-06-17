// Import Library
const {Router} = require('express');
const router = Router();

// Import Controller
const authController = require("../controller/authController");

// Routers post
router.post('/login',authController.login);
router.post('/registerNewUser', authController.registerNewUser);
router.post('/user/validation', authController.userIdValidation);
router.post('/user/isEmailAvailable', authController.isEmailAvailable);
router.post('/user/updateUser', authController.updateUser);
router.get("/logout", authController.logout);

// Export Module
module.exports = router;