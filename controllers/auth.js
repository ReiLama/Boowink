const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie');
const smtpTransport = require('nodemailer-smtp-transport');

// const pool = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

const transporter = nodemailer.createTransport(
    smtpTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        service: 'yahoo',
        secure: false,
        auth: {
            user: process.env.EMAILSENDER,
            pass: process.env.EMAILPASS
        },
        debug:true,
        logger:true
    })
);

exports.register = (req, res) => {

    const { name, email, password, passwordConfirm } = req.body;

    pool.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        //there is already an email with that value in our database
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email has been taken'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        pool.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
        });
    });
};


exports.login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            });
        }

        pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {

            if (!results || results.length === 0) {
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                });
                return;
            }

            if (!(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                });
            }

            else {
                const id = results[0].id;

                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log('The token is: ' + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES  * 1
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                // res.status(200).redirect("/");
                return res.json( {
                    message: 'User logged in'
                });
            }

        });
    } catch (error) {
        console.log(error);
    }
}

exports.changePassword = (req, res) => {
    try {
        const { email, oldPassword, newPassword, newPasswordConfirm } = req.body;

        pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], async (error, results) => {

            if (error) {
                return res.render('/changePassword', {
                    message: 'server error'
                });
            } else {
                console.log(results);
            }
            if (results.length === 0) {
                return res.render('changePassword', {
                    message: 'Invalid username or password'
                })
            }
            console.log(req.body);
            if (!(await bcrypt.compare(oldPassword, results[0].password))) {
                return res.status(401).render('changePassword', {
                    message: 'Current password is incorrect'
                });
            }

            if (newPassword !== newPasswordConfirm) {
                return res.render('changePassword', {
                    message: 'Passwords do not match'
                })
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (error, results) => {
                if (error) {
                    return console.log('Error updating password: ' + error.stack);

                } else {
                    console.log(results);
                    return res.render('changePassword', { message: 'Password updated succesfully' });
                }

            });
        });
    } catch (error) {

        console.log('Something went wrong: ' + error.stack);
        return res.status(500).json({ error: 'An error occurred' });

    }
};

exports.forgotpassword = (req, res) => {

    const { email } = req.body;

    console.log(req.body);

    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {

        if (results.length === 0) {
            res.render('/forgotpassword');
            return res.status(400).json({ message: 'No user found check your email' });

        }
        console.log('THIS IS THE RESUT' );
        console.log(results[0].id);
        const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        pool.query('INSERT INTO tokens SET? ', { id: results[0].id, reset_token: token, email: email })

        const resetlink = `http://localhost:3000/resetpassword?token=${token}`;

        console.log(resetlink);

        const mailOptions = {
            from: process.env.EMAILSENDER,
            to: 'node89@yahoo.com',
            subject: 'Password reset',
            html: `Click <a href="${resetlink}">here</a>to reset your pasword`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("email error");
                console.log(error);
                 
                return res.status(500).json({ message: 'Error sending email' });
            }
            console.log(`Email sent:${info}`);
            return res.json({ message: 'Email sent' });

        });

    });

}


exports.resetpassword = async (req, res) => {
    try {
        const { email, newPassword, newPasswordConfirm } = req.body;
        console.log(req.body);
        const cookieString = req.headers.cookie;
        const cookies = cookieParser.parse(cookieString);
        const token = cookies.jwt;
        let decodedToken;
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken) {
            console.log('TOKEN IS OK');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if (newPassword !== newPasswordConfirm) {
            return res.render('resetpassword', {
                message: 'Passwords do not match'
            })
        }

        pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (error, results) => {
            if (error) {
                return console.log('Error updating password: ' + error.stack);

            } else {
                console.log(results);
                return res.render('resetpassword', { message: 'Password reset success' });
            }

        });

    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Invalid or expired token' })
    }
}


exports.reservation = async (req, res) => {

    const { mybookings } = req.body;
    const userId = req.params.id;

    pool.query(' SELECT * FROM bookings LEFT JOIN hotels ON bookings.hotel_id = hotels.id WHERE bookings.user_id = ? ', [userId], (error, results) => {

        if(error){
            console.error('Something went wrong please try again later',error);
            res.status(500).json({message:'error getting bookings'});
        }else if (results.length === 0){
            res.status(404).json({message:'you have no bookings yet'})
        }else{
            res.json(results);
            
        }


    });
}

exports.logout = (req, res) => {
         res.clearCookie('jwt');
         res.redirect('/login');
      };

///////////////////////////////////////////////////////////////////////////////////////
//Prova me auth
// exports.register = (req, res) =>{
//     //CHECK existing user

//     const q = "SELECT * FROM users WHERE email = ? OR name = ?"
//      pool.query(q, [req.body.email, req.body.name], (err, data)=>{
//         if(err) return res.json(err)
//         if(data.length) return res.status(409).json("User already exists");

//         //Hash the password and create a user

//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);

//         const q = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)"
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash,
//         ]

//         pool.query(q, [values], (err, data)=>{
//             if (err) return res.json(err);
//             //for react
//             // return res.status(200).json("User has been created");

//             return res.render('register', {
//                                     message: 'User registered'
//                     });
//         })

//      })

// }

// exports.login = (req, res) =>{

//     //CHECK USER
    
//     const q = "SELECT * FROM users WHERE email = ?"

//     pool.query(q, [req.body.email], (err, data)=>{
//         if(err) return res.json(err);
//         // console.log(data[0].email);
//         if(data.length === 0) 

//         //react 
//         // return res.status(404).json("User not found");
//          {
//             return res.status(401).render('login', {
//                                 message: 'Email or password is incorrect'
//                             });
//             }

//         const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

//         if(!isPasswordCorrect)  {
//             return res.status(401).render('login', {
//                                 message: 'wrong Email or password '
//                             });
//             }

//             // return res.status(400).json("Wrong username or password");
//             const token = jwt.sign({id:data[0].id}, "jwtkey");
//             const {password, ...other} = data[0];

//             //react js 
//             // res.cookie("access_token", token, {
//             //     httpOnly: true
//             // }).status(200).json(data[0])
//              res.cookie("access_token", token, {
//                 httpOnly: true
//             }).status(200).render('index',{
//                 message: "you are logged in"
//             })
           


//     })
// }

// exports.logout = (req, res) =>{
//     res.clearCookie("access_token", {
//         sameSite: "none",
//         secure: true
//     }).status(200).render('index', {
//         message: "user has been logged out"
//     })
// }