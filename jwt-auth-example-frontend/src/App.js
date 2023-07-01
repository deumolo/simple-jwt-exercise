import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5001';

function App() {
  
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const loginHandler = async () => {
    try {
      const response = await axios.post(apiUrl + '/login', {
        username,
        password,
      });

      const { token } = response.data;
      setToken(token);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return <></>;
}

export default App;
