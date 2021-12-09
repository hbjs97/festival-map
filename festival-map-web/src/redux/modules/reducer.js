import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import login from './login';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['login'],
};

const reducer = combineReducers({
  login,
});

export default persistReducer(persistConfig, reducer);
