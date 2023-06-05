const mysql = require('mysql');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(bodyParser.json());



const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//CREATE HOTEL
exports.createHotel = (req, res) => {
    // const newHotel = req.body;
    // console.log(newHotel);
    // const sql = 'INSERT INTO hotels SET ?';
    // pool.query(sql, newHotel, (err, result) => {
    //     if (err) {
    //         res.status(500).json({ message: err.message });
    //     } else {
    //         const savedHotel = { id: result.insertId, ...newHotel };
    //         res.status(200).json(savedHotel);
    //     }
    // });
   
      

    // const newHotel = req.body;
    // console.log(newHotel);
  
    // // Parse the amenities property
    // const amenities = JSON.parse(newHotel.amenities);
  
    // // Update the newHotel object with the parsed amenities
    // const hotelData = {
    //   ...newHotel,
    //   amenities: JSON.stringify(amenities)
    // };
  
    // const sql = 'INSERT INTO hotels SET ?';
    // pool.query(sql, hotelData, (err, result) => {
    //   if (err) {
    //     res.status(500).json({ message: err.message });
    //   } else {
    //     const savedHotel = { id: result.insertId, ...hotelData };
    //     res.status(200).json(savedHotel);
    //   }
    // });
    const newHotel = req.body;
    console.log(newHotel);

  // Parse the amenities property
  const amenities = newHotel.amenities;

  // Update the newHotel object with the parsed amenities
  const hotelData = {
    ...newHotel,
    amenities: JSON.stringify(amenities)
  };

  const sql = 'INSERT INTO hotels SET ?';
  pool.query(sql, hotelData, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      const savedHotel = { id: result.insertId, ...hotelData };
      res.status(200).json(savedHotel);
    }
  });
  };
  
//UPDATE HOTEL
exports.updateHotel = (req, res) => {
  // const updatedHotel = req.body;
  // const sql = 'UPDATE hotels SET ? WHERE id = ?';
  // const values = [updatedHotel, req.params.id];

  // try {
  //   pool.query(sql, values, function (error, result) {
  //     if (error) throw error;
  //     console.log('Number of rows updated:', result.affectedRows);

  //     if (result.affectedRows === 0) {
  //       res.status(404).json({ message: "Hotel Not Found!" });
  //     } else {
  //       res.status(200).json(updatedHotel);
  //     }
  //   });
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }

  const updatedHotel = req.body;
  const amenities = JSON.stringify(updatedHotel.amenities);
  const sql = 'UPDATE hotels SET ? WHERE id = ?';
  const values = [{ ...updatedHotel, amenities }, req.params.id];

  try {
    pool.query(sql, values, function (error, result) {
      if (error) throw error;
      console.log('Number of rows updated:', result.affectedRows);

      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Hotel Not Found!" });
      } else {
        res.status(200).json(updatedHotel);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};


//DELETE HOTEL
exports.deleteHotel = async (req, res) => {
    const sql = 'DELETE FROM hotels WHERE id = ?';
    const values = [req.params.id];

    try {
        const result = await pool.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel has been deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//GET HOTEL
exports.getHotel = async (req, res) => {
    //   const hotelId = req.params.id;
    //       const result = await pool.query('SELECT * FROM hotels WHERE id = ?', [hotelId], (error, results)=>{
    //         if(error){
    //             console.error('Something went wrong please try again later', error);
    //             res.status(500).json({message:'error getting hotel'});

    //         }else if (results.length === 0){
    //             res.status(404).json({message:'Hotel not found'})
    //         }else{
    //             res.status(200).json(results);
    //         }
    
    //       });


    const hotelId = req.params.id;
    const result = await pool.query('SELECT * FROM hotels WHERE id = ?', [hotelId], (error, results) => {
    if (error) {
        console.error('Something went wrong, please try again later', error);
        res.status(500).json({ message: 'ERROR IN GETTING THE HOTEL' });
    } else if (results.length === 0) {
        res.status(404).json({ message: 'Hotel not found' });
    } else {
        const hotel = results[0];
        const amenities = JSON.parse(hotel.amenities);
        res.status(200).json({ ...hotel, amenities });
    }
});

};


//GET ALL HOTELS
exports.getHotels = async (req, res) => {    
       
    // const result = await pool.query('SELECT * FROM hotels', (error, results) => {
    //     if(error){
    //         console.error('Something went wrong please try again later', error);
    //         res.status(500).json({message:'ERROR IN GETTING THE HOTELS'});

    //     }else if (results.length === 0){
    //         res.status(404).json({message:'Hotels not found'})
    //     }else{
    //         res.status(200).json(results);
    //     }

    //   });

    //Version with the amenities in the db added
    const result = await pool.query('SELECT * FROM hotels', (error, results) => {
        if(error){
            console.error('Something went wrong please try again later', error);
            res.status(500).json({message:'ERROR IN GETTING THE HOTELS'});
    
        }else if (results.length === 0){
            res.status(404).json({message:'Hotels not found'})
        }else{
            const hotels = results.map(hotel => {
                const amenities = JSON.parse(hotel.amenities);
                return {...hotel, amenities};
            });
            res.status(200).json(hotels);
            
        }
    }); 
  };
  




