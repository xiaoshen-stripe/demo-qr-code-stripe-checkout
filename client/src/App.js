import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Checkout from './Checkout';
import Success from './Success';
import Cancel from './Cancel';
import Order from './Order';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Order />
          </Route>
          <Route path='/checkout' exact>
            <Checkout />
          </Route>
          <Route path='/success' exact>
            <Success />
          </Route>
          <Route path='/cancel' exact>
            <Cancel />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
