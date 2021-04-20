import React from 'react';

const LogOut = () => {
    
    return (
            <button onClick={() => {
                localStorage.setItem("token", "")
                window.location.reload();    
            }}>Log out</button>
    );
};

export default LogOut;