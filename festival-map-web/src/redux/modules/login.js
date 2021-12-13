import { FAXIOS } from '../../lib/common';
import { STAGING } from '../../lib/constant';
import qs from 'qs';

export const LOGOUT = 'festival-map/login/LOGOUT';
export const LOGIN_REQUEST = 'festival-map/login/LOGIN_REQUEST';
export const REFRESH_REQUEST = 'festival-map/login/REFRESH_REQUEST';
export const LOGIN_SUCCESS = 'festival-map/login/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'festival-map/login/LOGIN_FAIL';

export function setLoginRequest() {
  return {
    type: LOGIN_REQUEST,
    data: {},
  };
}
export function setRefreshRequest() {
  return {
    type: REFRESH_REQUEST,
    data: {},
  };
}
export function setLoginSuccess(data) {
  const loginDataExceptUserAuth = { ...data };
  delete loginDataExceptUserAuth.user_auth;
  return {
    type: LOGIN_SUCCESS,
    data: loginDataExceptUserAuth,
  };
}
export function setLoginFail() {
  return {
    type: LOGIN_FAIL,
    data: {},
  };
}
export function setLogout() {
  return {
    type: LOGOUT,
    data: {},
  };
}

const initState = {
  type: LOGOUT,
  data: {},
};

export default function reducer(state = initState, action) {
  if (action.type === LOGIN_REQUEST) {
    return {
      type: action.type,
      data: {},
    };
  }

  if (action.type === REFRESH_REQUEST) {
    return {
      type: action.type,
      data: {},
    };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      type: action.type,
      data: {
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        expires: action.data.expires,
        expires_refresh: action.data.expires_refresh,
        userInfo: action.data.userInfo,
        today: action.data.today,
      },
    };
  }

  if (action.type === LOGIN_FAIL) {
    return {
      type: action.type,
      data: {},
    };
  }

  if (action.type === LOGOUT) {
    return {
      type: action.type,
      data: {},
    };
  }

  return state;
}

export function loginThunk(loginInfo, history) {
  return async (dispatch) => {
    try {
      dispatch(setLoginRequest());
      const res = await FAXIOS(qs.stringify(loginInfo), null, 'post', `${STAGING}/api/login`);
      if (res.status >= 400) {
        throw new Error(res.message);
      }
      localStorage.setItem('accessToken', res.data.access_token);
      dispatch(setLoginSuccess(res.data));
      history.push(`${process.env.REACT_APP_ROUTER_PREFIX}/`);
    } catch (error) {
      dispatch(setLoginFail());
      alert(error);
    }
  };
}

export function logoutThunk() {
  return async (dispatch) => {
    try {
      localStorage.clear();
      dispatch(setLogout());
    } catch (error) {
      alert(error);
    }
  };
}
