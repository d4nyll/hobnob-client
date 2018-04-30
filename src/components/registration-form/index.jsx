import React from 'react';
import bcrypt from 'bcryptjs';
import { validator } from '../../utils';
import Button from '../button/index.jsx';
import Input from '../input/index.jsx';

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

  handleRegistration = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const payload = { 
      email: this.state.email.value,
      digest: bcrypt.hashSync(this.state.password.value, 10)
    };
    const request = new Request('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(payload)
    })
    fetch(request)
      .then(response => {
        if (response.status === 201) {
          return response.text();
        } else {
          throw new Error('Error creating new user');
        }
      })
      .then(console.log)
      .catch(console.log)
  }

  handleInputChange = (name, event) => {
    const value = event.target.value;
    const valid = validator[name](value);
    this.setState({
      [name]: { value, valid }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleRegistration}>
        <Input label="Email" type="email" name="email" id="email" value={this.state.email.value} valid={this.state.email.valid} onChange={this.handleInputChange} />
        <Input label="Password" type="password" name="password" id="password" value={this.state.password.value} valid={this.state.password.valid} onChange={this.handleInputChange} />
        <Button title="Register" id="register-button" disabled={!(this.state.email.valid && this.state.password.valid)}/>
      </form>
    )
  }
}

export default RegistrationForm;
