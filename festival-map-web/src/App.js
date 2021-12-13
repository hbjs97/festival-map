import { Route, Switch } from 'react-router-dom';
import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Blog from './components/Blog';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ParkingLot from './components/ParkingLot';
import Board from './components/Board';
import BoardView from './components/BoardView';
import BoardEnroll from './components/BoardEnroll';

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute restricted={false} component={SignUp} path={`${process.env.REACT_APP_ROUTER_PREFIX}/signup`} exact />
        <PublicRoute restricted={false} component={Login} path={`${process.env.REACT_APP_ROUTER_PREFIX}/login`} exact />
        <PublicRoute restricted={false} component={ParkingLot} path={`${process.env.REACT_APP_ROUTER_PREFIX}/parking-lot`} exact />
        <PublicRoute restricted={false} component={Board} path={`${process.env.REACT_APP_ROUTER_PREFIX}/board`} exact />
        <PrivateRoute component={BoardEnroll} path={`${process.env.REACT_APP_ROUTER_PREFIX}/board/enroll`} exact />
        <PrivateRoute component={BoardView} path={`${process.env.REACT_APP_ROUTER_PREFIX}/board/:id`} exact />
        <PublicRoute restricted={false} component={Blog} path={`${process.env.REACT_APP_ROUTER_PREFIX}/`} exact />
      </Switch>
    </div>
  );
}

export default App;
