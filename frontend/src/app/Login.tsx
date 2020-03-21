import React, {useContext} from 'react';
import {FirebaseContext} from "../firebase";

function Login() {
  const firebase = useContext(FirebaseContext);

  const logIn = () => {
    firebase?.doSignIn()
      .then(user => console.log(user))
      .catch(error => console.log(error));
  };

  return (
    <button onClick={_ => logIn()}>Log In</button>
  );
}

export default Login;
