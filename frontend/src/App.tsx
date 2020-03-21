import React, {useContext, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginView from "./app/loginView/LoginView";
import {Container} from "@material-ui/core";
import RidesFormView from "./app/ridesFormView/RidesFormView";
import Header from "./app/common/Header";
import PrivateRoute from "./app/common/ProtectedRoute";
import {FirebaseContext} from "./firebase";
import UserContext from "./user/context";
import firebase from "firebase";

function App() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState<firebase.User | null>(null);

  firebase?.addAuthObserver((user: firebase.User | null) => setUser(user));

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Header/>
        <Container >
          <Switch>
            <Route path="/login">
              <LoginView />
            </Route>
            <PrivateRoute path="/">
              <RidesFormView/>
            </PrivateRoute>
          </Switch>
        </Container>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
