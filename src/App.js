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
