import AboutUs from 'components/AboutUs/AboutUs';
import AllQuestions from 'components/AllQuestions/AllQuestions';
import AskQuestion from 'components/AskQuestion/AskQuestion';
import Code from 'components/Common/Code/Code';
import Nav from 'components/Common/Nav/Nav';
import Dashboard from 'components/Dashboard/Dashboard';
import Home from 'components/Home/Home';
import NotFound from 'components/NotFound/NotFound';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import QuestionDetail from 'components/Questions/QuestionDetail/QuestionDetail';
import QuestionsByTag from 'components/QuestionsByTag/QuestionsByTag';
import TagsList from "components/TagsList/TagsList";
import CreateAccount from 'components/UserAccount/CreateAccount/CreateAccount';
import LogIn from 'components/UserAccount/LogIn/LogIn';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
export const userAuthContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState({});


    return (
        <userAuthContext.Provider value={[currentUser, setCurrentUser]}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Nav />
                            <Home />
                        </Route>
                        <Route exact path="/home">
                            <Nav />
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Nav />
                            <LogIn />
                        </Route>
                        <Route path="/createAccount">
                            <Nav />
                            <CreateAccount />
                        </Route>
                        <Route exact path="/tags">
                            <Nav />
                            <TagsList />
                        </Route>
                        <Route path="/tags/:tag">
                            <Nav />
                            <QuestionsByTag />
                        </Route>
                        <Route exact path="/questions/all">
                            <Nav />
                            <AllQuestions />
                        </Route>
                        <PrivateRoute path="/ask">
                            <Nav />
                            <AskQuestion />
                        </PrivateRoute>
                        <PrivateRoute path="/questions/:id">
                            <Nav />
                            <QuestionDetail />
                        </PrivateRoute>

                        <PrivateRoute path="/dashboard">
                            <Dashboard />
                        </PrivateRoute>
                        <Route path="/editor">
                            <Nav />
                            <Code />
                        </Route>
                        <Route path="/about-us">
                            <Nav />
                            <AboutUs />
                        </Route>
                        <Route path="*">
                            <Nav />
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </userAuthContext.Provider>
    );
}

export default App;
