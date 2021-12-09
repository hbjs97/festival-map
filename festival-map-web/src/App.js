import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from './redux/modules/login';
import PublicRoute from './components/auth/PublicRoute';
import Blog from './components/Blog';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const loginStates = useSelector((state) => state.login);
  const isLogin = loginStates.type === LOGIN_SUCCESS;

  return (
    <div className="App">
      {/* v6, changed switch to routes  */}
      <Switch>
        <PublicRoute restricted={false} component={SignUp} path="/signup" />
        <PublicRoute restricted={false} component={Login} path="/login" />
        <PublicRoute restricted={true} component={Blog} path="/" exact />
        {/* <PublicRoute component={Register} path="/register" exact /> */}
        {/* <PublicRoute component={Login} path="/login" exact /> <PrivateRoute component={MyPage} path="/mypage" exact /> <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;
