import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_SUCCESS } from '../../redux/modules/login';

function PublicRoute({ component: Component, restricted, ...rest }) {
  const loginStates = useSelector((state) => state.login);
  const isLogin = loginStates.type === LOGIN_SUCCESS;
  return <Route {...rest} render={(props) => (!isLogin && restricted ? <Redirect to="/login" /> : <Component {...props} />)} />;
}

export default PublicRoute;
