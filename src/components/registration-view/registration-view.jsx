import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [values, setValues] = useState({
    // declaring hook for each input
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
  });

  // validating user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setValues({
        values, usernameErr: 'Username Required'});
      isReq = false;
    }else if(username.length < 2){
      setValues({
        values, usernameErr: 'Username must be 5 characters long'});
      isReq = false;
    }
    if (!password){
      setValues({
        values, passwordErr: 'Password Required'});
      isReq = false;
    }else if (password.length < 6){
      setValues({
        values, passwordErr: 'Password must be 6 characters long'});
      isReq = false;
    }
    if(!email){
      setValues({
        values, emailErr: 'Email Required'
      });
      isReq = false;
    }else if(email.indexOf('@') === -1) {
      setValues({
        values, emailErr: 'Email is invalid'
      });
      isReq = false;
    }else if(email.indexOf('.') === -1){
      setValues({
        values, emailErr: 'Email is invalid'
      });
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username}
          onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" value={[password]}
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthdate: </Form.Label>
        <Form.Control type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
