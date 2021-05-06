import React from 'react';
import { Link } from 'react-router-dom';

const FooterCol = (props) => {
    return (
        <div>
            <h4> {props.menuTitle} </h4>
            <ul>
                {props.menuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {props.children && props.children}
        </div>
    );
};

export default FooterCol;