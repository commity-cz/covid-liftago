import React from 'react';
import firebase from "firebase";

const UserContext = React.createContext<firebase.User | null>(null);
export default UserContext;
