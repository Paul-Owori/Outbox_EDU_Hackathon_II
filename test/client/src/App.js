import React from 'react';
import logo from './logo.svg';
import './App.css';

// Import Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import redux
import { Provider } from "react-redux";
import store from './redux/store'

// Components
import HomePage from './components/homepage_components/HomePage'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>

            <Route exact path="/" component={HomePage} />

          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
