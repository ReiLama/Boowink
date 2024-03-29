const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie');
const smtpTransport = require('nodemailer-smtp-transport');


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
        debug: true,
        logger: true
    })
);

exports.authenticateToken = (req, res, next) => {

    const user = req.user;
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
    console.log(`THIS IS ACCESS TOKEN ${accessToken}`);

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Missing token');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        res.json("I AM WORKING");
        next();
    });
}

exports.register = (req, res) => {
    try {

        const { firstname, lastname, username, email, password, passwordConfirm } = req.body;

        pool.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log(error);
            }
            //there is already an email with that value in our database
            if (results.length > 0) {
                return res.json({
                    message: 'That email has been taken'
                })
            } else if (password !== passwordConfirm) {
                return res.json({
                    message: 'Passwords do not match'
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            pool.query('INSERT INTO users SET ?', { username: username, email: email, password: hashedPassword, first_name: firstname, last_name: lastname }, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.json({
                        message: 'Something went wrong check your credentials 1'
                    });
                } else {
                    console.log(results);
                    return res.json({
                        message: 'User registered go to login page to login',
                    });
                }
            });
        });
    } catch (error) {
        return res.json({
            message: 'Something went wrong check your credentials 2'
        });

    }
};

exports.login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide an email and password'
            });
        }

        pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {

            if (!results || results.length === 0) {
                res.status(401).json({
                    message: 'Email or password is incorrect'
                });
                return;
            }

            if (!(await bcrypt.compare(password, results[0].password))) {
                res.status(401).json({
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
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 1
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                // res.status(200).redirect("/");
                return res.json({
                    message: 'User logged in',
                    user: results
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
                return res.status(500).json({
                    message: 'server error'
                });
            } else {
                console.log(results);
            }
            if (results.length === 0) {
                return res.status(400).json({
                    message: 'Invalid username or password'
                })
            }
            console.log(req.body);
            if (!(await bcrypt.compare(oldPassword, results[0].password))) {
                return res.status(400).json({
                    message: 'Current password is incorrect'
                });
            }

            if (newPassword !== newPasswordConfirm) {
                return res.status(400).json({
                    message: 'Passwords do not match'
                })
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (error, results) => {
                if (error) {
                    return console.log('Error updating password: ' + error.stack);

                } else {
                    console.log(results);
                    return res.status(200).json({ message: 'Password updated succesfully' });
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

    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {

        if (results.length === 0) {
            // res.render('/forgotpassword');
            return res.status(400).json({ message: 'No user found check your email' });

        }
        console.log('THIS IS THE RESULT');
        const recipient = results[0].email;
        console.log(recipient);
        const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        pool.query('INSERT INTO tokens SET? ', { id: results[0].id, reset_token: token, email: email })

        const resetlink = `http://localhost:3000/resetpassword?token=${token}`;

        const mailOptions = {
            from: process.env.EMAILSENDER,
            to: `${recipient}`,
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
            return res.status(400).json({
                message: 'Passwords do not match'
            })
        }

        pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (error, results) => {
            if (error) {
                return console.log('Error updating password: ' + error.stack);

            } else {
                console.log(results);
                return res.status(200).json({ message: 'Password reset success' });
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Invalid or expired token' })
    }
}

exports.hotelBook = async (req, res) => {

    const { mybookings } = req.body;
    const userId = req.params.id;

    pool.query(' SELECT * FROM bookings LEFT JOIN hotels ON bookings.hotel_id = hotels.id WHERE bookings.user_id = ? ', [userId], (error, results) => {

        if (error) {
            console.error('Something went wrong please try again later', error);
            res.status(500).json({ message: 'error getting bookings' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'you have no bookings yet' })
        } else {
            res.json(results);
        }
    });
}

exports.logout = (req, res) => {

    // Function to delete a cookie by setting its maxAge to 0
    function deleteCookie(res, name) {
        res.setHeader('Set-Cookie', cookie.serialize(name, '', {
            maxAge: 0,
            path: '/',
        }));
    }

    // Example usage in an Express route handler for logging out

    return res.json({
        message: "working user logged out",
        result: `${res.cookie('jwt', token, cookieOptions)}`
    })
};


exports.booking = async (req, res) => {

    // separate hootel book restaurant booking (each booking)
    const { Hotel_ID, checkInDate, checkOutDate, Board, Room_ID, numGuests, Res_Name, Res_details, Res_status } = req.body;
    const userId = req.user.id;
    const reservationSql = 'INSERT INTO reservations (User_ID,Res_Name,Res_details,Res_status) VALUES (?, ?, ?, ?)';
    const reservationValues = [userId, Res_Name, Res_details, Res_status];
    const sql = 'INSERT INTO hotel (user_id, Hotel_ID, check_in_date, check_out_date, room_type, num_guests) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [userId, Hotel_ID, checkInDate, checkOutDate, Board, numGuests];

    try {
        const reservationResult = ((req, res) => {
            pool.query(reservationSql, reservationValues, (error, results) => {
                if (error) {
                    res.status(404).json({message:"first promise"});
                    console.log(error);
                }
                res.json(results);
                console.log(results);
            });
        });

        const reservationId = reservationResult.insertId;
        console.log(reservationId);

        const hotelResult = await new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });

        const hotelId = hotelResult.insertId;

        const serviceSql = 'INSERT INTO Service (reservation_id, Hotel_ID) VALUES (?, ?)';
        const serviceValues = [reservationId, hotelId];
        const serviceResult = await new Promise((resolve, reject) => {
            pool.query(serviceSql, serviceValues, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });

        return res.json({
            message: "Booking completed successfully",
            results: [reservationResult, hotelResult, serviceResult]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while processing the booking"
        });
    }
};
