import React, { useEffect } from 'react';
import {IpcClient} from 'ipc-express';
import {ipcRenderer} from 'electron';
import {useHistory} from "react-router-dom";

export const Login = () => {
  const ipc = new IpcClient(ipcRenderer);
  const {push} = useHistory();
  useEffect(() => {
    console.log("login page loaded");
    ipc.post("/token", {})
    .then(res => {
      localStorage.setItem("token", res.data.token);
      push("/")
    })
  }, [])

  return (
    <div>
    </div>
  )
}

export default Login;
