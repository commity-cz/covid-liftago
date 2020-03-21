import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginView from "./app/loginView/LoginView";
import {Container} from "@material-ui/core";
import RidesFormView from "./app/ridesFormView/RidesFormView";
import Header from "./app/common/Header";
import PrivateRoute from "./app/common/ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Header/>
      <Container>
        <Switch>
          <Route path="/login">
            <LoginView/>
          </Route>
          <PrivateRoute path="/">
            <RidesFormView/>
          </PrivateRoute>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
