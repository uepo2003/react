import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', {
        user: {
          email,
          password
        }
      });
      console.log('Logged in', response.data);
      
      // Navigate to the /home route after successful login
      navigate('/home');

    } catch (error) {
      console.error('Error during login', error);
    }
  };



  return (
    <>
    <h1>ログイン画面</h1>
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
   </>
  );
}

export default Login;
