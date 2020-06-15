import React, { useEffect, useState } from 'react';
import { IpcClient } from 'ipc-express';
import { ipcRenderer } from 'electron';
import { useHistory } from "react-router-dom";
import { AuthFlow, AuthStateEmitter } from "../utils/auth/flow";

export const Login = () => {
  const [accessToken, setAccessToken] = useState({
    token: {
      refreshToken: null
    }
  });
  const authFlow = new AuthFlow();
  const ipc = new IpcClient(ipcRenderer);
  const { push } = useHistory();
  useEffect(() => {
    console.log("login page loaded");
    // authFlow.authStateEmitter.on(
    //   AuthStateEmitter.ON_TOKEN_RESPONSE, (tokenResponse) => {
    //     console.log("Token ready")
    //     setAccessToken({
    //       ...tokenResponse
    //     });
    //   });
    // if (!accessToken.token.refreshToken) {
    //   signIn();
    // }
  }, [])

  useEffect(() => {
    ipc.post("/token", accessToken)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      push("/")
    })
  }, [accessToken])

  const signIn = (username?: string): Promise<void> => {
    return authFlow.fetchServiceConfiguration().then(
      () => authFlow.makeAuthorizationRequest(username));
  }

  return (
    <div>
    </div>
  )
}

export default Login;
