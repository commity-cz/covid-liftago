import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginView from "./app/loginView/LoginView";
import {Container, makeStyles, Theme} from "@material-ui/core";
import RidesFormView from "./app/ridesFormView/RidesFormView";
import Header from "./app/common/Header";
import PrivateRoute from "./app/common/ProtectedRoute";
import RidesDetailView from "./app/ridesDetailView/RidesDetailView";
import Footer from "./app/common/Footer";
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
            <PrivateRoute path="/detail">
              <RidesDetailView/>
            </PrivateRoute>
            <PrivateRoute path="/ride-unavailable">
              <RideUnavailableView/>
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
