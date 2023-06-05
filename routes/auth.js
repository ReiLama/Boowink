const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/changePassword',authController.changePassword);

router.post('/forgotpassword',authController.forgotpassword);

router.post('/resetpassword',authController.resetpassword);

/////////////////////////////////////////////////////////////////////////////////////
//Prova me auth
// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);


module.exports = router;