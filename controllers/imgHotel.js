const mysql = require('mysql');
const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const multer = require('multer');



// dotenv.config({path: './.env'});
const publicDirectory = path.join(__dirname, './public');

//static to get all the static files like css;js
app.use(express.static(publicDirectory));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})


const upload = multer({ storage: storage });



const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});



exports.getImgHotels =  async (req, res) =>{

    const hotelId = req.params.id;

//Retrieving the JSON string array from the MySQL database
     const result = await pool.query('SELECT hotels_images FROM hotels WHERE id = ?', [hotelId], (err, results) => {
      
      if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Failed to retrieve hotel images' });
      return;
    }

    if (results.length === 0) {
      console.log('Hotel not found in the database');
      res.status(404).json({ error: 'Hotel not found' });
      return;
    }

    const jsonFileNames = JSON.parse(results[0].hotels_images);
    const imagePaths = [];

    // jsonFileNames.forEach((fileName) => {
    //   const imagePath = __dirname + '/public/imagesHotels/' + fileName;
    //   imagePaths.push(imagePath);
    // });

    //the image paths without the server's absolute path way 
    jsonFileNames.forEach((fileName) => {
      const imagePath = '/public/imagesHotels/' + path.basename(fileName);
      imagePaths.push(imagePath);
    });
    res.json({ imagePaths });
  });
}