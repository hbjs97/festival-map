import React, { useState, useRef, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import { sections, STAGING } from '../lib/constant';
import { FAXIOS } from '../lib/common';
import { isArray } from 'lodash';

const theme = createTheme();

function BoardView(props) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const res = await FAXIOS(null, null, 'get', `${STAGING}/api/posts`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    setPosts(res.data);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Festival Map" sections={sections} />
        <main></main>
      </Container>
      <Footer title="" description="" />
    </ThemeProvider>
  );
}

export default BoardView;
