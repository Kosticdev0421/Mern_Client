import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import loadingImg from "../../images/Loading-Infinity.gif";
import './Dashboard.css';
import EditQuestion from './EditQuestion/EditQuestion';
import Overview from './Overview/Overview';
import UserAnswers from './UserAnswers/UserAnswers';
import UserQuestions from './UserQuestions/UserQuestions';

const Dashboard = () => {

        const [userInfo, setUserInfo] = useState({});
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            fetch(`http://localhost:5000/userInfo`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUserInfo(data);
                    console.log(data);
                    setLoading(false);
                });
        }, []);
    if(loading){
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
                <img src={loadingImg} alt="" />
            </div>
        );
    }
    return (
        <div className="dashboard">


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
            </nav>
            <Switch>
                <Route exact path="/dashboard/">
                    <Overview userInfo={userInfo} />
                </Route>
                <Route path="/dashboard/overview">
                    <Overview userInfo={userInfo} />
                </Route>
                <Route path="/dashboard/questions">
                    <UserQuestions userInfo={userInfo} />
                </Route>
                <Route path="/dashboard/answers">
                    <UserAnswers userInfo={userInfo} />
                </Route>
                <Route exact path="/dashboard/edit/:id">
                    <EditQuestion />
                </Route>
            </Switch>
        </div>
    );
};

export default Dashboard;