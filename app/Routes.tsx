import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import Index from "./pages/index";


export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={Index} />
      </Switch>
    </App>
  );
}
