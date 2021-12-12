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
import { isArray } from 'lodash';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const theme = createTheme();

function Board(props) {
  const [posts, setPosts] = useState();
  const [postCount, setPostCount] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPosts();
  }, [page]);

  const handleChangePage = useCallback(
    (event, newPage) => {
      if (newPage) setPage(newPage);
    },
    [page]
  );

  async function getPosts() {
    const res = await FAXIOS(null, `Bearer ${localStorage.getItem('accessToken')}`, 'get', `${STAGING}/api/posts?page=${page - 1}`);
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
        <Header title="Festival Map" sections={sections} />
        <main style={{ marginTop: 15 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
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
