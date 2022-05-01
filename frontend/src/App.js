import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CustomizePage from './pages/CustomizePage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPassword from './pages/ForgotPassword';
import PasswordPage from './pages/PasswordPage';
import ResendPage from './pages/ResendPage';
import RecreationPage from './pages/RecreationPage';
import WaterPage from './pages/WaterPage';
import SleepPage from './pages/SleepPage';
import ExercisePage from './pages/ExercisePage';


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
        <Route path='/emailverification' exact>
          <EmailVerificationPage />
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
        <Route path="/resend" exact>
          <ResendPage />
        </Route>
        <Route path="/resetpassword" exact>
          <PasswordPage />
          </Route>
        <Route path="/recreation" exact>
          <RecreationPage />
        </Route>
        <Route path="/water" exact>
          <WaterPage />
        </Route>
        <Route path="/sleep" exact>
          <SleepPage />
        </Route>
        <Route path="/exercise" exact>
          <ExercisePage />
        </Route>
        <Redirect to="/login" />
      </Switch>  
    </Router>
  );
}
export default App;