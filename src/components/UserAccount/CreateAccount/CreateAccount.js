import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signUp } from "api";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import '../LogIn/LogIn.css';
const CreateAccount = () => {
    const history = useHistory();

    return (
        <div>
            <h1>Join for incredible</h1>
            <LogInForm />
            <small>
                <Link to="/login">How many times should I create account?</Link>
            </small>
        </div>
    );

    function LogInForm() {
        const [userName, setUserName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState('');

        return (
            <form onSubmit={handleLogIn} className="login-form">
                <FontAwesomeIcon icon={faUserLock} size="3x" color="crimson" />
                {error && <p className="error-text">{error}</p>}
                <input
                    name="name"
                    placeholder="What should I call you?"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "নাম ছাড়া ব্যক্তিত্ব গ্রহণযোগ্য নয়! প্রয়োজনে নতুন নাম দিয়ে আকিকা দিয়ে আসতে পারেন..."
                        )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                />
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
                    pattern=".{6,}"
                    onChange={(e) => setPassword(e.target.value)}
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "6 অক্ষরেরে নীচে পাসওয়ার্ডকে পাসওয়ার্ড বলা যায় না"
                        )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                />
                <button className="btn-brand">Create</button>
            </form>
        );

        async function handleLogIn(e) {
            e.preventDefault();

            const user = {
                userName,
                email,
                password,
            };

            try {
                const { data } = await signUp(user);
                if (!data.success) {
                    setError(data.message);
                } else {
                    // Account created successfully
                    history.push("/login");
                }
            } catch (error) {
                console.log(error);
            }
            
        }
    }
};

export default CreateAccount;
