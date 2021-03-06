import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import { STAGING } from '../lib/constant';
import { useHistory } from 'react-router-dom';
import { FAXIOS } from '../lib/common';
import { useState } from 'react';
import qs from 'qs';

const theme = createTheme();

function SignUp() {
  const history = useHistory();
  const [postValues, setPostValues] = useState({
    username: undefined,
    password: undefined,
    displayname: undefined,
  });

  const handleChange = (prop) => (event) => {
    setPostValues({ ...postValues, [prop]: event.target.value });
  };

  async function signup() {
    const res = await FAXIOS(qs.stringify(postValues), null, 'post', `${STAGING}/api/signup`);
    if (res.status >= 400) {
      alert(res.message);
      return;
    }
    history.push(`${process.env.REACT_APP_ROUTER_PREFIX}/login`);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth name="username" label="username" type="text" id="username" onChange={handleChange('username')} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="password" type="password" id="password" autoComplete="new-password" onChange={handleChange('password')} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="displayname" label="displayname" type="text" id="displayname" onChange={handleChange('displayname')} />
              </Grid>
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={signup}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => history.push(`${process.env.REACT_APP_ROUTER_PREFIX}/login`)}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
