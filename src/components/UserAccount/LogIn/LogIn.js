import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logIn } from "api";
import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userAuthContext } from "../../../App";
import "./LogIn.css";

const LogIn = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div>
            {/* <div style={{ position: "absolute", zIndex: -1 }}>
                <Particles height="75vh" width="100vw" params={particlesConfig} />
            </div> */}
            <h1>Dive into it right now!</h1>
            <LogInForm />
            <small>
                No account yet? <Link to="/createAccount">Create one now!</Link>
            </small>
        </div>
    );

    function LogInForm() {
        const [email, setEmail] = useState("demo@pb.com");
        const [password, setPassword] = useState("demo password");
        let history = useHistory();
        let location = useLocation();
        let { from } = location.state || { from: { pathname: "/dashboard" } };
        
        return (
            <form onSubmit={handleLogIn} className="login-form">
                {/* {loading && (
                    <div className="loading">
                        <img src={loadingImg} alt="" />
                    </div>
                )} */}
                <FontAwesomeIcon icon={faUserLock} size="3x" color="crimson" />
                {error && <p className="error-text">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn-brand" disabled={loading}>Log in</button>
            </form>
        );

        async function handleLogIn(e) {
            e.preventDefault();
            setLoading(true);
            const user = {
                email,
                password,
            };

            try {
                const { data } = await logIn(user);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    setCurrentUser(data.user);
                    history.replace(from);
                } else {
                    setError(data.message);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }

        }
    }
};

export default LogIn;
