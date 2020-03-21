import React, {useContext} from 'react';
import {FirebaseContext} from "../../firebase";
import LoginPage from "./LoginPage";

function LoginView() {
  const firebase = useContext(FirebaseContext);

  const signIn = (email: string, password: string) => {
    firebase?.doSignIn(email, password)
      .then(user => console.log(user))
      .catch(error => console.log(error));
  };

  return (
    <LoginPage onSubmit={signIn} />
  );
}

export default LoginView;
