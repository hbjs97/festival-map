import React, { useState, useRef, useEffect, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import { sections, STAGING } from '../lib/constant';
import { FAXIOS } from '../lib/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PaginationBar from './Table/PaginationBar';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useHistory } from 'react-router-dom';
import { isArray } from 'lodash';
import { Box, Button } from '@mui/material';
import moment from 'moment';

const theme = createTheme();

function Board(props) {
  const [posts, setPosts] = useState();
  const [postCount, setPostCount] = useState(0);
  const [page, setPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, [page]);

  const handleChangePage = useCallback(
    (event, newPage) => {
      if (newPage) setPage(newPage);
    },
    [page]
  );

  const moveToDetailPage = (e, postId) => {
    e.preventDefault();
    history.push(`/board/${postId}`);
  };

  const moveToEnrollPage = (e) => {
    e.preventDefault();
    history.push(`/board/enroll`);
  };

  async function getPosts() {
    const res = await FAXIOS(null, null, 'get', `${STAGING}/api/posts?page=${page - 1}`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    setPosts(res.data[0]);
    setPostCount(res.data[1]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="축제 한가득" sections={sections} />
        <main style={{ marginTop: 30 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div />
            <Button style={{ height: '50px', color: '#1976d2' }} onClick={moveToEnrollPage}>
              등록
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="board table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="right">
                    <ChatBubbleOutlineIcon sx={{ fontSize: 24 }} />
                  </TableCell>
                  <TableCell align="right">
                    <VisibilityOutlinedIcon sx={{ fontSize: 28 }} />
                  </TableCell>
                  <TableCell align="right">
                    <AccountCircleOutlinedIcon sx={{ fontSize: 25 }} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isArray(posts) &&
                  posts.map((post) => (
                    <TableRow key={post.post_post_id} hover={true} onClick={(e) => moveToDetailPage(e, post.post_post_id)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {post.post_title}
                      </TableCell>
                      <TableCell align="right" width={100}>
                        {moment(post?.createdAt).format('YYYY/MM/DD')}
                      </TableCell>
                      <TableCell align="right" width={150}>
                        {post?.repliesCount}
                      </TableCell>
                      <TableCell align="right" width={150}>
                        {post.post_view_count}
                      </TableCell>
                      <TableCell align="right" width={150}>
                        {post.createdBy_display_name}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginationBar page={page} itemCount={postCount} handleChangePage={handleChangePage} />
        </main>
      </Container>
      <Footer title="" description="" />
    </ThemeProvider>
  );
}

export default Board;
