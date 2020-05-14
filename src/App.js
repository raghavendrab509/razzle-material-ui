import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

export default App;
