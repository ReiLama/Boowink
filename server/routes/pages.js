const express = require('express');
const { authenticateUser } = require('../controllers/authentication');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    // res.render('register');
});

router.get('/login', (req, res) => {
    res.json({ message:'this is testing response for namecheap'});
});

router.get('/changePassword', (req, res) => {
    // res.render('changePassword');
});

router.get('/forgotpassword', authenticateUser, (req, res) => {
    // res.render('forgotpassword');
});

router.get('/resetpassword', authenticateUser, (req, res) => {
    // res.render('resetpassword');
});

router.get('/booking', authenticateUser, (req, res) => {
    // res.render('myBookings');
})

router.get('/logout', (req, res) => {
    deleteCookie(res, 'jwt');
    res.render('login');
});


module.exports = router;