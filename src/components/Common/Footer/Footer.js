import { faFacebookF, faGooglePlusG, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FooterCol from '../FooterCol/FooterCol';
import './Footer.css';

const Footer = () => {
    const ourAddress = [
        {
            name: "Jahangirnagar University, Savar, Dhaka, Bangladesh",
            link: "//goo.gl/maps/q69LTtv9BDQAHWoFA",
        },
    ];

    const quickLinks = [
        {name: "Login" , link: "/login"},
        {name: "Dashboard" , link: "/dashboard"},
        {name: "Our blog" , link: "/blog"}
    ]
    return (
        <footer className="footer-area">
            <div >
                <div className="footer-cols">
                    <FooterCol key={1} menuTitle="Quick Links" menuItems={quickLinks} />
                    <FooterCol key={2} menuTitle="Our Address" menuItems={ourAddress}>
                        <ul className="social-media">
                            <li >
                                <a href="//facebook.com">
                                    <FontAwesomeIcon className="icon active-icon"
                                        
                                        icon={faFacebookF}
                                    />
                                </a>
                            </li>
                            <li >
                                <a href="//google.com">
                                    <FontAwesomeIcon className="icon"  icon={faGooglePlusG} />
                                </a>
                            </li>
                            <li >
                                <a href="//instagram.com">
                                    <FontAwesomeIcon className="icon"  icon={faInstagram} />
                                </a>
                            </li>
                        </ul>
                        <div >
                            <h6>Call now</h6>
                            <button className="btn-brand" >+12345678</button>
                        </div>
                    </FooterCol>
                </div>
                <div >
                    <p>Copyright {new Date().getFullYear()} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;