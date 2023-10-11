const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');



//the path where to find the file .env
dotenv.config({path: './.env'});

//starting the server with app
const app = express();


//connecting to a database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


const publicDirectory = path.join(__dirname, './public');
//static to get all the static files like css;js
app.use(express.static(publicDirectory));
app.use(cookieParser());
app.use(cors());
//to grab the data from any form
app.use(express.urlencoded({extended: false}))
//the values that we are grabbing from the form are json
app.use(express.json());
// app.set('view engine', 'hbs');

db.connect((error)=>{
    if(error) {
        console.log(error);
    }else{
        console.log('MYSQL connected');
    }
});



//DEFINE ROUTES
// app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/rooms',require('./routes/rooms'))
app.use('/hotels', require('./routes/hotels'));
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port} `);
});