import React, { useContext, useState } from "react";
import Particles from 'react-particles-js';
import { Link, useHistory, useLocation } from "react-router-dom";
import { userAuthContext } from "../../../App";
import particlesConfig from "../../../config/particlesConfig";
import loadingImg from "../../../images/Loading-Infinity.gif";
import "./LogIn.css";

const LogIn = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div style={{ position: "absolute", zIndex: -1 }}>
                <Particles height="80vh" width="100vw" params={particlesConfig} />
            </div>
            <h1>ঝাঁপিয়ে পরুন এখনই</h1>
            <LogInForm />
            <small>
                এখনও একাউন্ট থেকে বঞ্চিত? <Link to="/createAccount">ঝটপট একাউন্ট খুলুন</Link>
            </small>
        </div>
    );

    function LogInForm() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        let history = useHistory();
        let location = useLocation();
        let { from } = location.state || { from: { pathname: "/" } };
        return (
            <form onSubmit={handleLogIn} className="login-form">
                {loading && (
                    <div className="loading">
                        
                        <img src={loadingImg} alt="" />
                    </div>
                )}
                {error && <p className="error-text">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="ইমেইল"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="পাসওয়ার্ড"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn-brand">Log in</button>
            </form>
        );

        function handleLogIn(e) {
            e.preventDefault();
            setLoading(true);
            const user = {
                email,
                password,
            };
            fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    if (data.success) {
                        // console.log(data);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        setCurrentUser(data.user);
                        history.replace(from);
                    } else {
                        setError(data.message);
                        setLoading(false);
                    }
                });

            // setEmail("");
            // setPassword("");
        }
    }
};

export default LogIn;