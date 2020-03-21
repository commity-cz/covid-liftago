import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from "./firebase";
import UserContext from "./user/context";
import firebase from "firebase";
import Router from "./Router";

function App() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    firebase?.addAuthObserver((user: firebase.User | null) => {
      setUser(user)
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Router/>
    </UserContext.Provider>
  );
}

export default App;
