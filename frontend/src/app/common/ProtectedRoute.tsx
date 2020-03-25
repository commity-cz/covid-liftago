import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import UserContext from "../../user/context";
import CenteredCircularProgress from "./CenteredCircularProgress";

type Props = {
  path: string;
};

const PrivateRoute: React.FC<Props> = ({children, ...rest}) => {
  const user = useContext(UserContext);

  if (user === null) {
    return (
      <Redirect to="/login"/>
    )
  }

  return (
    <Route
      {...rest}
      render={() =>
        user === undefined ? (
          <CenteredCircularProgress/>
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
