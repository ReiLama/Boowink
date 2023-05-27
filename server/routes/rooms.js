const express = require('express');
const roomsController = require('../controllers/room');
const router =  express.Router();
//CREATE
router.post("/", roomsController.createRoom);
// //UPDATE
router.put("/:id", roomsController.updateRoom);
// //DELETE
router.delete("/:id", roomsController.deleteRoom);
// //GET ALL ROOMS
router.get("/", roomsController.getRooms);
// //GET 1 room
router.get("/:id", roomsController.getRoom);
module.exports = router;