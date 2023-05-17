const express = require('express');
const imagesController = require('../controllers/imageController');

const router =  express.Router();

//UPLOAD IMAGE ---SINGLE VERSION---
router.post("/", imagesController.createUploadImage);

//UPLOAD IMAGE ---ARRAY VERSION----
router.post("/array", imagesController.createUploadImagesArray);


//GET UPLOADED IMAGES BY FILENAME, SINGLE UPLOAD VERSION
router.get("/:filename", imagesController.getUploadedImages);

//GET UPLOADED IMAGES BY THE FILENAME, ARRAY VERSION...
router.get("/array/:filename", imagesController.getUploadedImagesArrayByFilename);

//GET ONLY THE URL OF THE ARRAY OF IMAGES
router.get("/", imagesController.getAllImages);


module.exports = router;