import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import PrivateRoute from "./utils/PrivateRoute";
import Index from "./pages/index";
import Login from "./pages/login";


export default function Routes() {
  return (
    <App>
      <Switch>
          <PrivateRoute exact path={routes.HOME} component={Index} />
        <Route path={routes.LOGIN}>
          <Login />
        </Route>
      </Switch>
    </App>
  );
}
