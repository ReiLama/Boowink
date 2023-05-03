const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
    
});

router.get('/changePassword', (req, res) => {
    res.render('changePassword');
});

router.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword');
});

router.get('/resetpassword', (req, res) => {
    res.render('resetpassword');
});

router.get('/logout', (req, res) => {
    res.render('login');
});

module.exports = router;