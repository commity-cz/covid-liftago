import React, {useContext} from 'react';
import {Link, Route} from "react-router-dom";
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
          <div>Prosím <Link to="/login">přihlaste se</Link></div>
        )
      }
    />
  );
}

export default PrivateRoute;
