import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CustomizePage from './pages/CustomizePage';
import EmailVerification from './components/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import PasswordPage from './pages/PasswordPage';



function App() {
  return (
    <Router >
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/home" exact>
          <HomePage />
          </Route>
        <Route path='/api/verifyaccount/${id}' exact>
          <EmailVerification />
        </Route>
        <Route path="/customize" exact>
          <CustomizePage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/retrieveaccount" exact>
          <ForgotPassword />
        </Route>
        <Route path="/resetpassword" exact>
          <PasswordPage />
        </Route>
        <Redirect to="/login" />
      </Switch>  
    </Router>
  );
}
export default App;