import React, { useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';

const sections = [
  { title: '메인', url: '' },
  { title: '공연', url: 'map' },
  { title: '문의', url: 'question' },
  { title: '게시판', url: 'board' },
];

const mainFeaturedPost = {
  title: 'Main Post Title',
  description: 'Multiple lines description',
  image: 'https://source.unsplash.com/random',
  imageText: 'Main image description',
  linkText: 'Go map',
};

const featuredPosts = [
  {
    title: 'Festival title 1',
    date: 'Nov 12',
    description: 'description',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Festival title 2',
    date: 'Nov 11',
    description: 'description',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'About',
  description: 'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
};

const theme = createTheme();

function Blog(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Festival Map" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main />
            <Sidebar title={sidebar.title} description={sidebar.description} archives={sidebar.archives} />
          </Grid>
        </main>
      </Container>
      <Footer title="" description="" />
    </ThemeProvider>
  );
}

export default Blog;
