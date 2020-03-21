import React, {useContext, useState} from 'react';
import {FirebaseContext} from "../../firebase";
import LoginPage from "./LoginPage";
import UserContext from "../../user/context";
import {Redirect} from "react-router-dom";

function LoginView() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signIn = (email: string, password: string) => {
    firebase?.doSignIn(email, password)
      .catch(error => setErrorMessage('Nepodařilo se přihlásit'));
  };

  if (user) {
    return <Redirect to='/' />
  }

  return (
    <LoginPage onSubmit={signIn} errorMessage={errorMessage} />
  );
}

export default LoginView;
