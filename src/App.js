import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AllQuestions from './components/AllQuestions/AllQuestions';
import AskQuestion from './components/AskQuestion/AskQuestion';
import Code from './components/Common/Code/Code';
import Nav from './components/Common/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import LanguagesList from './components/LanguagesList/LanguagesList';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import QuestionDetail from './components/QuestionDetail/QuestionDetail';
import QuestionsByLanguage from './components/QuestionsByLanguage/QuestionsByLanguage';
import LogIn from './components/UserAccount//LogIn/LogIn';
import CreateAccount from './components/UserAccount/CreateAccount/CreateAccount';

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
                      <Route exact path="/languages">
                            <Nav />
                          <LanguagesList />
                      </Route>
                      <Route path="/languages/:language">
                            <Nav />
                          <QuestionsByLanguage />
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
