import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AskQuestion from './components/AskQuestion/AskQuestion';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import LanguagesList from './components/LanguagesList/LanguagesList';
import LogIn from './components/LogIn/LogIn';
import Nav from './components/Nav/Nav';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import QuestionDetail from './components/QuestionDetail/QuestionDetail';
import QuestionsByLanguage from './components/QuestionsByLanguage/QuestionsByLanguage';

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
                      <Route exact path="/languages">
                          <LanguagesList />
                      </Route>
                      <Route path="/languages/:language">
                          <QuestionsByLanguage />
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
