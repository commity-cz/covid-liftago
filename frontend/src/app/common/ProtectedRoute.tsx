import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import UserContext from "../../user/context";
import {Box, CircularProgress} from "@material-ui/core";

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
          <Box display="flex">
            <Box m="auto">
              <CircularProgress/>
            </Box>
          </Box>
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
