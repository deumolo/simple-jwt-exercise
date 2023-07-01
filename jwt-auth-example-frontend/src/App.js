import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000';

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    token && setToken(token);
  }, []);

  const loginHandler = async () => {
    try {
      const response = await axios.post(apiUrl + '/login', {
        username,
        password,
      });

      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const protectedHandler = async () => {
    try {
      const response = await axios.get(apiUrl + '/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div>
        {token && <p>Already signed in </p>}
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={loginHandler}>Login</button>
      </div>
      <div>
        <button onClick={protectedHandler}>Protected</button>
      </div>
    </>
  );
}

export default App;
