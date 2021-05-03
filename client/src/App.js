import './App.css';
// 1. import dependencies
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// 2. create components
import Checkout from './Checkout';
import Success from './Success';
import Cancel from './Cancel';
import Order from './Order';



// Create routing
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
          {/* Make sure this goes last */}

        </Switch>
      </Router>
    </div>
  );
}

export default App;
