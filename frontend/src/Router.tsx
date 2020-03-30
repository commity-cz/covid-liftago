import { Container, makeStyles, Theme } from "@material-ui/core";
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./app/common/Footer";
import Header from "./app/common/Header";
import PrivateRoute from "./app/common/ProtectedRoute";
import LoginView from "./app/loginView/LoginView";
import PasswordResetView from "./app/passwordReset/PasswordResetView";
import RidesFormView from "./app/ridesFormView/RidesFormView";
import RidesListView from "./app/ridesListView/RidesListView";
import RideUnavailableView from "./app/rideUnavailableView/RideUnavailableView";

const useStyles = makeStyles(({palette}: Theme) => ({
  '@global': {
    body: {
      background: palette.grey["200"]
    }
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  noShrink: {
    flexShrink: 0,
  }
}));

function Router() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.layout}>
        <Header className={classes.noShrink}/>
        <Container className={classes.content}>
          <Switch>
            <Route path="/login">
              <LoginView/>
            </Route>
            <Route path="/password-reset">
              <PasswordResetView/>
            </Route>
            <PrivateRoute path="/ride-unavailable">
              <RideUnavailableView/>
            </PrivateRoute>
            <PrivateRoute path="/list/:message?">
              <RidesListView/>
            </PrivateRoute>
            <PrivateRoute path="/">
              <RidesFormView/>
            </PrivateRoute>
          </Switch>
        </Container>
        <Footer className={classes.noShrink}/>
      </div>
    </BrowserRouter>
  );
}

export default Router;
