import React from 'react';

const LogOut = () => {
    
    return (
            <li className="link-text" style={{cursor: "pointer"}} onClick={() => {
                localStorage.setItem("token", "");
                localStorage.setItem("refreshToken", "");
                window.location.reload();    
            }}>Log out</li>
    );
};

export default LogOut;