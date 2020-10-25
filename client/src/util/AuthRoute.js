import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
function AuthRoute({ component: Component, ...rest }) {
  const { user } = useAuthContext();
  return (
    <Route
      {...rest}
      render={() => (user ? <Redirect to='/' /> : <Component />)}
    />
  );
}

export default AuthRoute;
