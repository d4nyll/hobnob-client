import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegistrationForm from './components/registration-form/index.jsx';
import LoginForm from './components/login-form/index.jsx';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={RegistrationForm} />,
      <Route exact path="/login" component={LoginForm} />
    </Switch>
  </BrowserRouter>
), document.getElementById('renderTarget'));
