const express = require('express');
const authController = require('../controllers/auth');
// const loginController = require('../controllers/login')
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/changePassword',authController.changePassword);
router.post('/forgotpassword',authController.forgotpassword);
router.post('/resetpassword',authController.resetpassword);
router.post('./hotelbooking',authController.booking);




module.exports = router;