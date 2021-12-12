import React, { useState, useRef, useEffect, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import { sections, STAGING } from '../lib/constant';
import { FAXIOS } from '../lib/common';
import MultilineTextField from './TextFeild/MultilineTextField';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import qs from 'qs';

const theme = createTheme();

function BoardEnroll(props) {
  const [postValues, setPostValues] = useState({
    title: '',
    content: '',
  });
  const history = useHistory();

  const handleChange = useCallback(
    (prop) => (event) => {
      setPostValues({ ...postValues, [prop]: event.target.value });
    },
    [postValues]
  );
  const backToBoard = (e) => {
    e.preventDefault();
    history.goBack();
  };

  async function createPost() {
    const res = await FAXIOS(qs.stringify(postValues), `Bearer ${localStorage.getItem('accessToken')}`, 'post', `${STAGING}/api/posts`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    history.goBack();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Festival Map" sections={sections} />
        <main style={{ marginTop: 30 }}>
          <Box>
            <MultilineTextField multiline={false} value={postValues.title} placeholder="제목" onChange={handleChange('title')} />
            <MultilineTextField value={postValues.content && postValues.content.replace(/↵/g, '\n')} onChange={handleChange('content')} sx={{ marginTop: 0 }} />
            <Stack style={{ display: 'flex', justifyContent: 'center' }} direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />} onClick={backToBoard}>
                {'취소'}
              </Button>
              <Button variant="contained" endIcon={<SendIcon />} onClick={createPost}>
                {'등록'}
              </Button>
            </Stack>
          </Box>
        </main>
      </Container>
      <Footer title="" description="" />
    </ThemeProvider>
  );
}

export default BoardEnroll;
