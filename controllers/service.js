const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});



// GET ALL SERVICES
exports.getAllServices = async (req, res) => {
  const result = await pool.query('SELECT * FROM services', (error, results) => {
    if(error){
        console.error('Something went wrong please try again later', error);
        res.status(500).json({message:'ERROR IN GETTING THE SERVICES'});

    }else if (results.length === 0){
        res.status(404).json({message:'Service not found'})
    }else{
        res.status(200).json(results);
    }

  });
};

// CREATE RESERVATION
exports.createService = async (req, res) => {
  const newService = req.body;
  console.log(newService);
  const sql = 'INSERT INTO services SET ?';
  pool.query(sql, newService, (err, result) => {
      if (err) {
          res.status(500).json({ message: err.message });
      } else {
          const savedService = { id: result.insertId, ...newService };
          res.status(200).json(savedService);
      }
  });
  
};

//UPDATE SERVICE
exports.updateService = (req, res) => {
  const updateService= req.body;
  console.log(updateService)
  const sql = 'UPDATE services SET ? WHERE service_id = ?';
  const values = [updateService, req.params.id];

  try {
      let result = pool.query(sql, values);

      pool.query(sql, values, function (error, result) {
          if (error) throw error;
          console.log('Number of rows updated:', result.affectedRows);

          if (result.affectedRows === 0) {
              res.status(404).json({ message: "Service Not Found!" });
          } else {
              res.status(200).json(updateService);
          }
        });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

  // GET 1 SERVICES BY ID
  exports.getServiceById = async (req, res) => {

    const serviceId = req.params.id;
    const result = await pool.query('SELECT * FROM services WHERE service_id = ?', [serviceId], (error, results)=>{
      if(error){
          console.error('Something went wrong please try again later', error);
          res.status(500).json({message:'error getting service'});

      }else if (results.length === 0){
          res.status(404).json({message:'Service not found'})
      }else{
          res.status(200).json(results);
      }

    });
  };

 // Delete a SERVICE
 exports.deleteService= async (req, res) => {

  const sql = 'DELETE FROM services WHERE service_id = ?';
  const values = [req.params.id];

  try {
      const result = await pool.query(sql, values);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json({ message: 'Service has been deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


//GET SERVICES BY RESERVATION ID
// exports.getServicesByReservationId = async (reservation_id) => {
//   try {
//     const sql = 'SELECT * FROM services WHERE reservation_id = ?';
//     const result = await pool.query(sql, [reservation_id]);
//     return result;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };
exports.getServicesByReservationId = async (req, res) => {
  const reservationId = req.params.reservation_id;
  console.log(reservationId);
  try {
    const sql = 'SELECT * FROM services WHERE reservation_id = ?';
    const result = await pool.query(sql, [reservationId]);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

