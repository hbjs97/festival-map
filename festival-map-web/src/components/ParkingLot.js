import React, { useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import ParkingLotMap from './ParkingLotMap';
import { sections } from '../lib/constant';

const theme = createTheme();

function ParkingLot(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="축제 한가득" sections={sections} />
        <main>
          <ParkingLotMap style={{ height: '80vh' }} />
        </main>
      </Container>
      <Footer title="" description="" />
    </ThemeProvider>
  );
}

export default ParkingLot;
