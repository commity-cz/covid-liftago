import React, {useContext} from 'react';
import {FirebaseContext} from "../../firebase";
import LoginPage from "./LoginPage";

function LoginView() {
  const firebase = useContext(FirebaseContext);

  const logIn = () => {
    firebase?.doSignIn()
      .then(user => console.log(user))
      .catch(error => console.log(error));
  };

  return (
    <LoginPage />
  );
}

export default LoginView;
