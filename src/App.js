import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { Switch } from 'react-router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Switch>
      <PublicRoute>
        <SignIn exact path="/signin" />
      </PublicRoute>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

serviceWorkerRegistration.register();
export default App;
