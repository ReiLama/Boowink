const express = require('express');
const hotelsController = require('../controllers/hotel');
const router =  express.Router();
//CREATE
router.post("/", hotelsController.createHotel);
//UPDATE
router.put("/:id", hotelsController.updateHotel);
//DELETE
router.delete("/:id", hotelsController.deleteHotel);
//GET ALL
router.get("/", hotelsController.getHotels);
//GET 1 HOTEL
router.get("/:id", hotelsController.getHotel);
module.exports = router;