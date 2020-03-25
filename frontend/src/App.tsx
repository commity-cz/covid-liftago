import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from "./firebase";
import { theme } from "./theme";
import UserContext from "./user/context";
import Router from "./Router";
import { ThemeProvider } from '@material-ui/core';

function App() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    firebase?.addAuthObserver((user: firebase.User | null) => {
      setUser(user)
    });
  }, [firebase]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <Router/>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
