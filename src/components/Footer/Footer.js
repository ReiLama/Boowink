import React from "react";
import "./Footer.css";
import { FaFacebookSquare, FaInstagram, FaTwitter }from "react-icons/fa"

// create footer component
const Footer = () => {
    return (
        <footer>
        <div class="footer-container">
            
                <div class="footer-content">
                    <h5>Content</h5>
                    <p>ca llafe sfnjdfdhf djfhdfjhfhjfhjd fhjdhjdjhdfjhdfhjdfh</p>
                </div>
                <div class="footer-contact">
                    <h5>Contacts</h5>
                    <p>Tel: 202-555-0117</p>
                    <p>Mail: boowink@gmail.co</p>
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
                <div class="footer-Price">
                    <h5>Price</h5>
                    <a href="https://google.com">Pricing</a>
                    <br></br>
                    <a href="https://google.com">Premium</a>
                    <br></br>
                    <a href="https://google.com">promotions</a>
                </div>
        </div>
        </footer>
    );
    };
    export default Footer;
