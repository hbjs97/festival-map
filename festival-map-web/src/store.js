import { applyMiddleware, createStore } from 'redux';
import reducer from './redux/modules/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxThunk)));
export const persistor = persistStore(store);
