import React, { useRef } from 'react';

const MakeAdmin = () => {
    const emailRef = useRef();
    return (
        <div
            style={{
                width: "350px",
                margin: "1rem auto",
            }}
        >
            <form onSubmit={handleMakeAdmin}>
                <input type="text" className="question-input" placeholder="Email" ref={emailRef} />
                <button className="btn-brand">Make Admin</button>
            </form>
        </div>
    );

    function handleMakeAdmin(e){
        e.preventDefault();
        const newAdminEmail = emailRef.current.value;
        fetch(`${process.env.REACT_APP_SERVER_URL}/makeAdmin`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ newAdminEmail }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
            });
    }
};

export default MakeAdmin;