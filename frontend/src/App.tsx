import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import LoginView from "./app/loginView/LoginView";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/">
            <div>Homepage</div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
