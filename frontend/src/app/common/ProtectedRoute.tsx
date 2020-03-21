import React, {useContext} from 'react';
import {Route} from "react-router-dom";
import UserContext from "../../user/context";


type Props = {
  path: any;
};

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const user = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <div>Prosím přihlaste se</div>
        )
      }
    />
  );
}

export default PrivateRoute;
