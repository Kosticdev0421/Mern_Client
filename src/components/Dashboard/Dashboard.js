import { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import loadingImg from '../../images/Loading-Infinity.gif';
import PrivateRouteAdmin from '../PrivateRoute/PrivateRouteAdmin';
import AddReview from './AddReview/AddReview';
import './Dashboard.css';
import EditQuestion from './EditQuestion/EditQuestion';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import Overview from './Overview/Overview';
import SideBar from './Sidebar/SideBar';
import UserAnswers from './UserAnswers/UserAnswers';
import UserQuestions from './UserQuestions/UserQuestions';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/userInfo`, {
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
                
                <img src={loadingImg} alt="" />
            </div>
        );
    }
    return (
        <div className="dashboard">

            <SideBar />
            
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
                <Route exact path="/dashboard/addReview">
                    <AddReview />
                </Route>
                
                <PrivateRouteAdmin exact path="/dashboard/make-admin">
                    <MakeAdmin />
                </PrivateRouteAdmin>
            </Switch>
        </div>
    );
    
};


export default Dashboard;