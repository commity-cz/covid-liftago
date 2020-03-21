import React, {useContext} from 'react';
import {FirebaseContext} from "../../firebase";
import LoginPage from "./LoginPage";
import UserContext from "../../user/context";
import {Redirect} from "react-router-dom";

function LoginView() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  const signIn = (email: string, password: string) => {
    firebase?.doSignIn(email, password)
      .then(user => {
        console.log(user);
      })
      .catch(error => console.log(error));
  };

  if (user) {
    return <Redirect to='/' />
  }

  return (
    <LoginPage onSubmit={signIn} />
  );
}

export default LoginView;
