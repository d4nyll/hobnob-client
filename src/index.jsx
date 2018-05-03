import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import RegistrationForm from './components/registration-form/index.jsx';

ReactDOM.render((
  <BrowserRouter>
    <Route path="/register" component={RegistrationForm} />
  </BrowserRouter>
), document.getElementById('renderTarget'));
