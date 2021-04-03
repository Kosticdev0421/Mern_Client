import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AskQuestion from './components/AskQuestion/AskQuestion';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import Nav from './components/Nav/Nav';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import QuestionDetail from './components/QuestionDetail/QuestionDetail';

export const userAuthContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState({});


    return (
      <userAuthContext.Provider value={[currentUser, setCurrentUser]}>
          <div className="App">
              <Router>
                
                  <Nav />
                  <Switch>
                      <Route exact path="/">
                          <Home />
                      </Route>
                      <Route exact path="/home">
                          <Home />
                      </Route>
                      <Route path="/login">
                          <LogIn />
                      </Route>
                      <Route path="/createAccount">
                          <CreateAccount />
                      </Route>
                      <PrivateRoute path="/ask">
                          <AskQuestion />
                      </PrivateRoute>
                        <PrivateRoute path="/questions/:id">
                            <QuestionDetail />
                        </PrivateRoute>
                        
                        <PrivateRoute path="/dashboard">
                            <Dashboard />
                        </PrivateRoute>
                      <Route path="*">
                          <NotFound />
                      </Route>
                  </Switch>
              </Router>
          </div>
      </userAuthContext.Provider>
  );
}

export default App;
