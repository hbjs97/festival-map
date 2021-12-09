import { FAXIOS } from '../../lib/common';
import { API_ROUTE } from '../../lib/constant';

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

export function loginThunk(user_name, password, history) {
  return async (dispatch) => {
    try {
      dispatch(setLoginRequest());
      const formData = new FormData();
      formData.append('user_name', user_name);
      formData.append('password', password);

      const result = await FAXIOS(formData, null, 'post', API_ROUTE.login);
      if (typeof result == 'string') {
        throw new Error(result);
      }
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('expires', result.data.expires);
      localStorage.setItem('expires_refresh', result.data.expires_refresh);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      dispatch(setLoginSuccess(result.data));
      history.push('/');
    } catch (error) {
      dispatch(setLoginFail());
      alert(error);
    }
  };
}

export function logoutThunk() {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('accessToken')) {
        const result = await FAXIOS(null, localStorage.getItem('accessToken'), 'post', API_ROUTE.logout);
        if (typeof result == 'string') {
          throw new Error(result);
        }
      }
      localStorage.clear();
      dispatch(setLogout());
    } catch (error) {
      alert(error);
    }
  };
}

export function refreshThunk() {
  return async (dispatch) => {
    try {
      dispatch(setRefreshRequest());
      const result = await FAXIOS(null, localStorage.getItem('refreshToken'), 'post', `${API_ROUTE.auth}/refresh`);
      if (typeof result == 'string') {
        throw new Error(result);
      }
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('expires', result.data.expires);
      localStorage.setItem('expires_refresh', result.data.expires_refresh);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      dispatch(setLoginSuccess(result.data));
    } catch (error) {
      dispatch(setLoginFail());
      alert(error);
    }
  };
}
