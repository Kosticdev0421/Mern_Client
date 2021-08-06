import React, { useContext } from 'react';
import { userAuthContext } from '../../../App';
import Charts from '../Charts/Charts';
import './Overview.css';

    
const Overview = ({userInfo}) => {
    const [currentUser] = useContext(userAuthContext);

    return (
        <div className="overview">
            <div className="top-container">
                <div className="overview-box">
                    <img
                        src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"
                        alt=""
                    />
                    <h4>{currentUser.userName.toUpperCase()}</h4>
                    <p>{currentUser.email}</p>
                </div>
                <div className="overview-box">
                    <p>Questions</p>
                    <h2>{userInfo?.questions?.length || "At least 0"}</h2>
                </div>
                <div className="overview-box">
                    <p>Answers</p>
                    <h2>{userInfo?.answers?.length || "More than -1"}</h2>
                </div>
            </div>
            <Charts />
        </div>
    );
    
};

export default Overview;