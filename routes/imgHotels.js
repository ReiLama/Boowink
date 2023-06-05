const express = require('express');
const imgHotelsController = require('../controllers/imgHotel');

const router = express.Router();

router.get('/:id', imgHotelsController.getImgHotels);

module.exports = router;