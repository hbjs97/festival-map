import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS, logoutThunk } from '../redux/modules/login';
import { useCallback } from 'react';

function Header(props) {
  const { sections, title } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const loginStates = useSelector((state) => state.login);
  const isLogin = loginStates.type === LOGIN_SUCCESS;

  const logout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  const moveToPage = (e, url) => {
    e.preventDefault();
    history.push(`${url}`);
  };

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
          {title}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            if (isLogin) {
              logout();
              history.push('/');
            } else {
              history.push('/login');
            }
          }}
        >
          {isLogin ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
        {sections.map((section) => (
          <Link color="inherit" noWrap key={section.title} variant="" onClick={(e) => moveToPage(e, section.url)} sx={{ p: 1, flexShrink: 0, textDecoration: 'none', fontWeight: 'bold' }}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
