import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import NotFound from './components/NotFound';

ReactDOM.render(
  // <React.StrictMode>
  <RenderAfterNavermapsLoaded ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID} error={<p>Maps Load Error</p>}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Switch>
            <Route path={process.env.REACT_APP_ROUTER_PREFIX} component={App} />
            <Route path="*" component={NotFound} />
          </Switch>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </RenderAfterNavermapsLoaded>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
