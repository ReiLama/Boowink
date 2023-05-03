const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


// GET ALL RESERVATIONS
exports.getAllReservations = async (req, res) => {
    const result = await pool.query('SELECT * FROM reservations', (error, results) => {
      if(error){
          console.error('Something went wrong please try again later', error);
          res.status(500).json({message:'ERROR IN GETTING THE RESERVATIONS'});

      }else if (results.length === 0){
          res.status(404).json({message:'Reservation not found'})
      }else{
          res.status(200).json(results);
      }

    });
  };
  
  // GET 1 RESERVATION BY ID
exports.getReservationById = async (req, res) => {

    const reservationId = req.params.id;
    const result = await pool.query('SELECT * FROM reservations WHERE reservation_id = ?', [reservationId], (error, results)=>{
      if(error){
          console.error('Something went wrong please try again later', error);
          res.status(500).json({message:'error getting reservation'});

      }else if (results.length === 0){
          res.status(404).json({message:'Reservation not found'})
      }else{
          res.status(200).json(results);
      }

    });
  };
  
  // CREATE RESERVATION
  exports.createReservation = async (req, res) => {
    const newReservation = req.body;
    console.log(newReservation);
    const sql = 'INSERT INTO reservations SET ?';
    pool.query(sql, newReservation, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            const savedReservation = { id: result.insertId, ...newReservation };
            res.status(200).json(savedReservation);
        }
    });
    
  };


  //UPDATE RESERVATION
  exports.updateReservation = (req, res) => {
    const updateReservation = req.body;
    console.log(updateReservation)
    const sql = 'UPDATE reservations SET ? WHERE reservation_id = ?';
    const values = [updateReservation, req.params.id];

    try {
        let result = pool.query(sql, values);

        pool.query(sql, values, function (error, result) {
            if (error) throw error;
            console.log('Number of rows updated:', result.affectedRows);

            if (result.affectedRows === 0) {
                res.status(404).json({ message: "Reservation Not Found!" });
            } else {
                res.status(200).json(updateReservation);
            }
          });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  

  
// Delete a reservation
exports.deleteReservation = async (req, res) => {

    const sql = 'DELETE FROM reservations WHERE reservation_id = ?';
    const values = [req.params.id];

    try {
        const result = await pool.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation has been deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};






  








