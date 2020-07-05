import React, { useEffect, useState } from 'react';
import { IpcClient } from 'ipc-express';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import getAuthenticated from '../utils/auth/googleFlow';

export const Login = () => {
  const [accessToken, setAccessToken] = useState(null);
  const ipc = new IpcClient(ipcRenderer);
  const { push } = useHistory();

  useEffect(() => {
    console.log('login page loaded');
    if (!localStorage.getItem('token')) {
      const run = async () => {
        const tokens = await getAuthenticated();
        setAccessToken(tokens);
      };
      run();
    }

  }, []);

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      ipc.post("/token", accessToken)
        .then(res => {
          localStorage.setItem('token', res.data.token);
          push('/');
        })
        .catch(err => console.log(err));
    }
  }, [accessToken])

  return <div />;
}

export default Login;
