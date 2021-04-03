import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAuthContext } from "../../App";
import LogOut from "../LogOut/LogOut";
import "./Nav.css";

const Nav = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/getUser", {
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.auth) {
                    console.log(result.user)
                    setCurrentUser(result.user);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
    }, []);
    if (loading) {
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
            </div>
        );
    }

    return (
        <div className="nav-bar">
            <ul>
                <h1 className="app-title">{"< প্রোগ্রামিং ব্যবচ্ছেদ />"}</h1>
                <Link to="/" className="link-text">
                    <li>হোম</li>
                </Link>
                <Link to="/ask" className="link-text">
                    <li>প্রশ্ন জিজ্ঞেস করুন</li>
                </Link>
                <Link to="/top" className="link-text">
                    <li>সেরা প্রশ্ন</li>
                </Link>
                <Link to="/languages" className="link-text">
                    <li>প্রোগ্রামিং ভাষাসমূহ</li>
                </Link>
                {currentUser.email ? (
                    <span>
                        <Link to="/" className="link-text">
                            <li>{currentUser.userName.toUpperCase()}</li>
                        </Link>
                        <LogOut />
                    </span>
                ) : (
                    <Link to="/login" className="link-text">
                        <li>লগ ইন করুন</li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default Nav;
