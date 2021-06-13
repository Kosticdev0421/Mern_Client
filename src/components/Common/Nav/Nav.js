import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userAuthContext } from "../../../App";
import logo from '../../../images/logo/logo.png';
import LogOut from "../../UserAccount//LogOut/LogOut";
import "./Nav.css";

const Nav = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/getUser`, {
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.auth) {
                    setCurrentUser(result.user);
                }
            });
    }, []);

    return (
        <div className="nav-bar">
            <ul>
                <h1 className="app-title">
                    {/* {"< প্রোগ্রামিং"} &nbsp;
                    <img src={logo} alt="" />
                    {"/>"} */}
                    <img src={logo} alt=""/>
                </h1>
                <Link to="/" className="link-text">
                    <li>Home</li>
                </Link>
                <Link to="/ask" className="link-text">
                    <li>Ask Question</li>
                </Link>
                <Link to="/questions/all" className="link-text">
                    <li>All Questions</li>
                </Link>
                <Link to="/tags" className="link-text">
                    <li>Topics</li>
                </Link>
                {currentUser.email ? (
                    <span>
                        <Link to="/dashboard" className="link-text">
                            <li>{currentUser.userName.toUpperCase()}</li>
                        </Link>
                        <LogOut />
                    </span>
                ) : (
                    <Link to="/login" className="link-text">
                        <li>Log In</li>
                    </Link>
                )}
                <Link to="/about-us" className="link-text">
                    <li>About Us</li>
                </Link>
            </ul>
        </div>
    );
};

export default Nav;
