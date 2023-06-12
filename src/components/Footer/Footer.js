import React from "react";
import "./Footer.css";
import { FaFacebookSquare, FaInstagram, FaTwitter }from "react-icons/fa"

// create footer component
const Footer = () => {
    return (
        <footer>
        <div class="footer-container">
            
                <div className="footer-content">
                    <h5>About us</h5>
                    <p> Boowink Travel: You can Search Hotels,Cheap Flights, Car Rentals & Vacations, we are here to help you!</p>
                </div>
                <div class="footer-contact">
                    <h5>Contacts</h5>
                    <p>Tel: +49 756 904893</p>
                    <p>Mail: boowink@gmail.com</p>
                </div>
                <div class="footer-socialMedia">
                    <h5>Social Media</h5>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
                        <FaFacebookSquare/>
                    </a>
                    <br></br>
                    <a href="https://google.com">
                        <FaInstagram />
                    </a>
                    <br></br>
                    <a href="https://google.com">
                        <FaTwitter/>
                    </a>
                </div>
        </div>
        </footer>
    );
    };
    export default Footer;
