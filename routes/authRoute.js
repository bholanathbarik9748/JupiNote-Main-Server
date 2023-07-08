// Import Library
const {Router} = require('express');
const router = Router();

// Import Controller
const authController = require("../controller/authController");

// Routers post
router.get("/logout", authController.logout);

// Routers post
router.post('/login',authController.login);
router.post('/registerNewUser', authController.registerNewUser);
router.post('/user/validation', authController.userIdValidation);
router.post('/user/isEmailAvailable', authController.isEmailAvailable);
router.post('/user/updateUser', authController.updateUser);
router.post('/user/password/restart', authController.restartPassword);
router.post('/user/username/restart', authController.restartUserName);

// Export Module
module.exports = router;