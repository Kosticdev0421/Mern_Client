import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './Dashboard.css';
import Overview from './Overview/Overview';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Router>
                <nav className="sidebar">
                    <Link to="/dashboard/overview" className="link-text">
                        <li>Overview</li>
                    </Link>
                    <Link to="/dashboard/overview" className="link-text">
                        <li>Questions</li>
                    </Link>
                    <Link to="/dashboard/overview" className="link-text">
                        <li>Answers</li>
                    </Link>
                </nav>
                <Switch>
                    <Route path="/dashboard/">
                        <Overview />
                    </Route>
                    <Route path="/dashboard/overview">
                        <Overview />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default Dashboard;