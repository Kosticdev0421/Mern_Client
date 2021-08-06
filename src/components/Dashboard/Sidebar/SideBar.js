import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userAuthContext } from '../../../App';
import LogOut from '../../UserAccount/LogOut/LogOut';
import './Sidebar.css';

const SideBar = () => {
    const [currentUser] = useContext(userAuthContext);

    return (
        <nav className="sidebar">
            <Link to="/" className="link-text">
                <li>Home</li>
            </Link>
            <Link to="/dashboard/overview" className="link-text">
                <li>Overview</li>
            </Link>
            <Link to="/dashboard/questions" className="link-text">
                <li>Questions</li>
            </Link>
            <Link to="/dashboard/answers" className="link-text">
                <li>Answers</li>
            </Link>
            <Link to="/dashboard/addReview" className="link-text">
                <li>Write A Review</li>
            </Link>
            {currentUser.userStatus === "admin" && (
                <Link to="/dashboard/make-admin" className="link-text">
                    <li>Make Admin</li>
                </Link>
            )}
            <span style={{ margin: "auto 0" }}>
                <LogOut />
            </span>
        </nav>
    );
};

export default SideBar;