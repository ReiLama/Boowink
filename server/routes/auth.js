const express = require('express');
const authController = require('../controllers/authentication');
// const loginController = require('../controllers/login')
const router = express.Router();


// authenticated routes
router.get('/logout',authController.authenticateUser, authController.logout);
router.post('/changePassword',authController.authenticateUser, authController.changePassword);
router.post('/resetpassword',authController.authenticateUser, authController.resetpassword);
router.post('/booking',authController.authenticateUser, authController.booking);


// public routes
router.post('/forgotpassword',authController.forgotpassword);
router.post('/login', authController.login);
router.get('/login',authController.login);
router.post('/register', authController.register);

module.exports = router;