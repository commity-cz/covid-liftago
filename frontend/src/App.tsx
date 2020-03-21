import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from "./firebase";
import UserContext from "./user/context";
import Router from "./Router";

function App() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    firebase?.addAuthObserver((user: firebase.User | null) => {
      setUser(user)
    });
  }, [firebase]);

  return (
    <UserContext.Provider value={user}>
      <Router/>
    </UserContext.Provider>
  );
}

export default App;
