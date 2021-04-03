import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userAuthContext } from "../../App";
import "./LogIn.css";

const LogIn = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div>
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
                {
                    loading && <div className="loading"><h2>Processing your request...</h2></div>
                }
                {
                    error && <p className="error-text">{error}</p>
                }
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
                <button>Log in</button>
            </form>
        );

        function handleLogIn(e) {
            e.preventDefault();
            setLoading(true);
            const user = {
                email,
                password,
            };
            fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.success) {
                        localStorage.setItem("token", data.token);
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
