import React, { useState, useEffect, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import { sections, STAGING } from '../lib/constant';
import { FAXIOS } from '../lib/common';
import PaginationBar from './Table/PaginationBar';
import { isArray } from 'lodash';
import MultilineTextField from './TextFeild/MultilineTextField';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import qs from 'qs';

const theme = createTheme();

function BoardView(props) {
  const [replies, setReplies] = useState();
  const [post, setPost] = useState();
  const [replyCount, setReplyCount] = useState(0);
  const [page, setPage] = useState(1);
  const [replyContent, setReplyContent] = useState(String);
  const history = useHistory();

  const backToBoard = (e) => {
    e.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getReplies();
  }, [page]);

  const handleReplyContent = useCallback(
    (event) => {
      setReplyContent(event.target.value);
    },
    [replyContent]
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      if (newPage) setPage(newPage);
    },
    [page]
  );

  async function getPost() {
    const res = await FAXIOS(null, `Bearer ${localStorage.getItem('accessToken')}`, 'get', `${STAGING}/api/posts/${props.match.params.id}`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    setPost(res.data);
  }

  async function createReply() {
    const res = await FAXIOS(qs.stringify({ content: replyContent }), `Bearer ${localStorage.getItem('accessToken')}`, 'post', `${STAGING}/api/posts/${props.match.params.id}/replies`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    setReplyContent('');
    getReplies();
  }

  async function getReplies() {
    const res = await FAXIOS(null, `Bearer ${localStorage.getItem('accessToken')}`, 'get', `${STAGING}/api/posts/${props.match.params.id}/replies?page=${page - 1}`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    setReplies(res.data[0]);
    setReplyCount(res.data[1]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="축제 한가득" sections={sections} />
        <main style={{ marginTop: 30 }}>
          <Card>
            <CardHeader
              avatar={<Avatar aria-label="recipe"></Avatar>}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post?.createdBy?.displayname}
              subheader={moment(post?.createdAt).format('MMM D YYYY')}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" marginBottom={4}>
                {post?.title}
              </Typography>
              <Typography variant="body3" color="text.secondary" whiteSpace={'pre'}>
                {post?.content}
              </Typography>
            </CardContent>
          </Card>
          <Box>
            <MultilineTextField value={replyContent && replyContent.replace(/↵/g, '\n')} onChange={handleReplyContent} />
            <Stack style={{ display: 'flex', justifyContent: 'center' }} direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />} onClick={backToBoard}>
                {'취소'}
              </Button>
              <Button variant="contained" endIcon={<SendIcon />} onClick={createReply}>
                {'등록'}
              </Button>
            </Stack>
          </Box>
          <Divider variant="middle" sx={{ marginY: 5 }} />
          <Box>
            {isArray(replies) &&
              replies.map((reply) => {
                return (
                  <Card key={reply.replyId} sx={{ marginBottom: 1 }}>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe"></Avatar>}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={reply?.createdBy?.displayname}
                      subheader={moment(reply?.createdAt).format('MMM D YYYY')}
                    />
                    <CardContent>
                      <Typography variant="body3" color="text.secondary" whiteSpace={'pre'}>
                        {reply.content}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </Box>
          {replyCount ? <PaginationBar page={page} itemCount={replyCount} handleChangePage={handleChangePage} /> : undefined}
        </main>
      </Container>
      <Footer title="" description="" />
    </ThemeProvider>
  );
}

export default BoardView;
