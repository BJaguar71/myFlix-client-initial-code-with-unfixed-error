// Imported React and its useState hook 
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  // called useState() with empty string, the intial value of login variable
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // returns an array of paired values, destructured above


  return(
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Login</button>
    </form>
  );
}
