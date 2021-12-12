import { Switch } from 'react-router-dom';
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
        <PublicRoute restricted={false} component={SignUp} path="/signup" exact />
        <PublicRoute restricted={false} component={Login} path="/login" exact />
        <PublicRoute restricted={false} component={ParkingLot} path="/parking-lot" exact />
        <PublicRoute restricted={false} component={Board} path="/board" exact />
        <PrivateRoute component={BoardEnroll} path="/board/enroll" exact />
        <PrivateRoute component={BoardView} path="/board/:id" exact />
        <PublicRoute restricted={false} component={Blog} path="/" exact />
      </Switch>
    </div>
  );
}

export default App;
