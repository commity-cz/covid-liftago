import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import LoginView from "./app/loginView/LoginView";
import {Container} from "@material-ui/core";
import RidesFromView from "./app/ridesFormView/RidesFromView";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <nav>
          <ul>
            <li>
              <Link to="/">Jízda</Link>
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
            <RidesFromView/>
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
