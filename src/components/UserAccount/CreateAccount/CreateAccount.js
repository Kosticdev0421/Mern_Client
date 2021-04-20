import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import '../LogIn/LogIn.css';
const CreateAccount = () => {
    const history = useHistory();
    return (
        <div>
            <h1>মচৎকার সব ফিচারের জন্য যুক্ত হন এখনই</h1>
            <LogInForm />
            <small>
                <Link to="/login">একবার একাউন্ট করলাম তো, আর কয়বার করব?</Link>
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
                {error && <p className="error-text">{error}</p>}
                <input
                    name="name"
                    placeholder="যে নামে আপনাকে ডাকবো"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "নাম ছাড়া ব্যক্তিত্ব গ্রহণযোগ্য নয়! প্রয়োজনে নতুন নাম দিয়ে আকিকা দিয়ে আসতে পারেন..."
                        )
                    }
                    onInput={e => e.target.setCustomValidity("")}
                />
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
                    pattern=".{6,}"
                    onChange={(e) => setPassword(e.target.value)}
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "ছয় অক্ষরেরে নীচে পাসওয়ার্ডকে পাসওয়ার্ড বলা যায় না"
                        )}
                        onInput={e => e.target.setCustomValidity("")}
                />
                <button>Create</button>
            </form>
        );

        function handleLogIn(e) {
            e.preventDefault();

            const user = {
                userName,
                email,
                password,
            };
            
            fetch(`${process.env.REACT_APP_SERVER_URL}/addUser`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((serverResponse) => {
                    if (!serverResponse.success) {
                        setError(serverResponse.message);
                    } else {
                        // Account created successfully
                        history.push('/login');
                    }
                });
            // setUserName('');
            // setEmail('');
            // setPassword('');
        }
    }
};

export default CreateAccount;
