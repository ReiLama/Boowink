const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
//CREATE HOTEL
exports.createHotel = (req, res) => {
    const newHotel = req.body;
    console.log(newHotel);
    const sql = 'INSERT INTO hotels SET ?';
    pool.query(sql, newHotel, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            const savedHotel = { id: result.insertId, ...newHotel };
            res.status(200).json(savedHotel);
        }
    });
};
//UPDATE HOTEL
exports.updateHotel = (req, res) => {
    const updatedHotel = req.body;
    console.log(updatedHotel)
    const sql = 'UPDATE hotels SET ? WHERE id = ?';
    const values = [updatedHotel, req.params.id];
    try {
        let result = pool.query(sql, values);
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
    // const hotelId = req.params.id;
    // console.log(hotelId)
    // try {
    //     const result = await pool.query('SELECT * FROM hotels WHERE id = ?', [hotelId]);
    //     console.log(result);
    //     if (result.length === 0) {
    //       return res.status(404).json({ message: 'Hotel not found' });
    //     }
    //     res.status(200).json(result[0]);
    //   } catch (err) {
    //     res.status(500).json({ message: err.message });
    //   }
      const hotelId = req.params.id;
          const result = await pool.query('SELECT * FROM hotels WHERE id = ?', [hotelId], (error, results)=>{
            if(error){
                console.error('Something went wrong please try again later', error);
                res.status(500).json({message:'error getting hotel'});
            }else if (results.length === 0){
                res.status(404).json({message:'Hotel not found'})
            }else{
                res.status(200).json(results);
            }
          });
};
//GET ALL HOTELS
exports.getHotels = async (req, res) => {
    // try {
    //     pool.getConnection(function(err, connection) {
    //       if (err) throw err; // not connected!
    //       // Use the connection
    //       connection.query('SELECT * FROM hotels', function (error, results, fields) {
    //         // When done with the connection, release it
    //         connection.release();
    //         // Handle error after the release
    //         if (error) throw error;
    //         res.status(200).json(results);
    //       });
    //     });
    //   } catch (err) {
    //     res.status(500).json({ message: err.message });
    //   }
    const result = await pool.query('SELECT * FROM hotels', (error, results) => {
        if(error){
            console.error('Something went wrong please try again later', error);
            res.status(500).json({message:'ERROR IN GETTING THE HOTELS'});
        }else if (results.length === 0){
            res.status(404).json({message:'Hotels not found'})
        }else{
            res.status(200).json(results);
        }
      });
  };