const express = require('express');
const servicesController = require('../controllers/service');

const router =  express.Router();

//GET
// router.get('/reservations/:reservationId/services', servicesController.getServicesByReservationId);

//GET
router.get("/", servicesController.getAllServices);

//GET BY ID
router.get("/:id", servicesController.getServiceById);

//DELETE
router.delete("/:id", servicesController.deleteService);

//CREATE
router.post("/", servicesController.createService);

//UPDATE 
router.put("/:id", servicesController.updateService);

//GET SERVICES BY RESERVATION ID
// router.get('/reservations/:reservation_id/services', servicesController.getServicesByReservationId);
router.get('/reservations/:reservation_id/services', servicesController.getServicesByReservationId);


module.exports = router;


