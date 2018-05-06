import React from 'react';
import bcrypt from 'bcryptjs';
import { validator } from '../../utils';
import Button from '../button/index.jsx';
import Input from '../input/index.jsx';

function retrieveSalt (email) {
  const url = new URL('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/salt/');
  url.search = new URLSearchParams({ email });

  const request = new Request(url, {
    method: 'GET',
    mode: 'cors'
  });

  return fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error('Error retrieving salt');
      }
    })
}

function login (email, digest) {

  // Send the credentials to the server
  const payload = { email, digest };
  const request = new Request('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(payload)
  })
  return fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error('Error logging in');
      }
    })
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      email: {
        value: "",
        valid: null
      },
      password: {
        value: "",
        valid: null
      }
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const email = this.state.email.value;
    const password = this.state.password.value;

    retrieveSalt(email)
      .then(salt => bcrypt.hashSync(password, salt))
      .then(digest => login(email, digest))
      .then(token => this.setState({ token }))
      .catch(console.error)
  }

  handleInputChange = (name, event) => {
    const value = event.target.value;
    const valid = validator[name](value);
    this.setState({
      [name]: { value, valid }
    });
  }

  render() {
    if(this.state.token) {
      return <div id="login-success">You have logged in successfully</div>
    }
    return (
      <form onSubmit={this.handleLogin}>
        <Input label="Email" type="email" name="email" id="email" value={this.state.email.value} valid={this.state.email.valid} onChange={this.handleInputChange} />
        <Input label="Password" type="password" name="password" id="password" value={this.state.password.value} valid={this.state.password.valid} onChange={this.handleInputChange} />
        <Button title="Login" id="login-button" disabled={!(this.state.email.valid && this.state.password.valid)}/>
      </form>
    )
  }
}

export default LoginForm;
