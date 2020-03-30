import React, { useContext, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import Firebase, { FirebaseContext } from "../../firebase";
import UserContext from "../../user/context";
import PasswordResetForm from "./PasswordResetForm";

function PasswordResetView() {
  const firebase = useContext(FirebaseContext) as Firebase;
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(function () {
    if (user) {
      history.push('/')
    }
  }, [history, user]);

  const resetPassword = ({ email }: { email: string }) => {

    return firebase.sendPasswordResetEmail(email, window.location.origin + '/login')
      .then(function (v) {
        history.push('/login?reset=true')
      }).catch(function (error) {
        if (error.code === 'auth/invalid-email') {
          return { 'email': "Zadejte validní email" }
        }

        if (error.code === 'auth/user-not-found') {
          return { main: "Pro uvedený email neexistuje v aplikaci užvatelský účet." };
        }

        return { main: 'Došlo k chybě, pokud se bude opakovat, kontaktujte dodavatele aplikace.' };
      });
  };

  if (user) {
    return <Redirect to='/'/>
  }

  return (
    <PasswordResetForm onSubmit={resetPassword}/>
  );
}

export default PasswordResetView;
