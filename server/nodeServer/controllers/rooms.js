const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
// CREATE
exports.createRoom = async (req, res) => {
    const newRoom = req.body;
    console.log(newRoom);
    const sql = 'INSERT INTO rooms SET ?';
    pool.query(sql, newRoom, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            const savedRoom = { id: result.insertId, ...newRoom };
            res.status(200).json(savedRoom);
        }
});
};
// // UPDATE
exports.updateRoom = async (req, res) => {
    const updatedRoom = req.body;
    const sql = 'UPDATE rooms SET ? WHERE id = ?';
    const values = [updatedRoom, req.params.id];
    try {
      const result = await pool.query(sql, values);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json(updatedRoom);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// // DELETE
exports.deleteRoom = async (req, res) => {
    const sql = 'DELETE FROM rooms WHERE id = ?';
    const values = [req.params.id];
    try {
        const result = await pool.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room has been deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// GET ONE ROOM (by ID)
exports.getRoom = async (req, res, next) => {
    const roomId = req.params.id;
    const result = await pool.query('SELECT * FROM rooms WHERE id = ?', [roomId], (error, results)=>{
      if(error){
          console.error('Something went wrong please try again later', error);
          res.status(500).json({message:'error getting room'});
      }else if (results.length === 0){
          res.status(404).json({message:'Room not found'})
      }else{
          res.status(200).json(results);
      }
    });
};
// GET ALL ROOMS
exports.getRooms = async (req, res) => {
    const result = await pool.query('SELECT * FROM rooms', (error, results) => {
        if(error){
            console.error('Something went wrong please try again later', error);
            res.status(500).json({message:'ERROR IN GETTING THE Rooms'});
        }else if (results.length === 0){
            res.status(404).json({message:'Rooms not found'})
        }else{
            res.status(200).json(results);
        }
    });
};