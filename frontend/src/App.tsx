import React, {useContext, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginView from "./app/loginView/LoginView";
import {Container} from "@material-ui/core";
import RidesFromView from "./app/ridesFormView/RidesFromView";
import Header from "./app/common/Header";
import PrivateRoute from "./app/common/ProtectedRoute";
import {FirebaseContext} from "./firebase";
import UserContext from "./user/context";

function App() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  firebase?.addAuthObserver((user: any) => setUser(user));

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
              <RidesFromView/>
            </PrivateRoute>
          </Switch>
        </Container>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
