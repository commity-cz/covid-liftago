import React, {useContext} from 'react';
import './App.css';
import {FirebaseContext} from "./firebase";

function App() {
  const firebase = useContext(FirebaseContext);

  const logIn = () => {
    firebase?.doSignIn()
      .then(user => console.log(user))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <button onClick={_ => logIn()}>LogIn</button>
    </div>
  );
}

export default App;
