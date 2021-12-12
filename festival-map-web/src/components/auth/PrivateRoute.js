import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_SUCCESS } from '../../redux/modules/login';

function PrivateRoute({ component: Component, ...rest }) {
  const loginStates = useSelector((state) => state.login);
  const isLogin = loginStates.type === LOGIN_SUCCESS;
  return <Route {...rest} render={(props) => (isLogin ? <Component {...props} /> : <Redirect to="/login" />)} />;
}

export default PrivateRoute;
