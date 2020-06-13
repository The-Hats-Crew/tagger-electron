import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";
import routes from "../constants/routes.json";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const {push} = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  )
}

export default PrivateRoute;
