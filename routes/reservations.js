const express = require('express');
const reservationsController = require('../controllers/reservation');

const router =  express.Router();

//GET
router.get("/", reservationsController.getAllReservations);

//GET BY ID
router.get("/:id", reservationsController.getReservationById);

//DELETE
router.delete("/:id", reservationsController.deleteReservation);

//CREATE
router.post("/", reservationsController.createReservation);

//UPDATE 
router.put("/:id", reservationsController.updateReservation);

module.exports = router;

