import React, { useState, useRef, useEffect } from 'react';
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
import { sections, STAGING } from '../lib/constant';
import { FAXIOS } from '../lib/common';
import { isArray } from 'lodash';

const theme = createTheme();

function Blog(props) {
  const [featuredPost, setFeaturedPost] = useState();

  useEffect(() => {
    getRecentFestivals();
  }, []);

  async function getRecentFestivals() {
    const res = await FAXIOS(null, null, 'get', `${STAGING}/api/festivals/recent`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    setFeaturedPost(res.data);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="축제 한가득" sections={sections} />
        <main>
          <MainFeaturedPost post={{ title: '축제 한가득', description: '축제 정보와 주변의 주차공간을 확인해보세요. ', image: 'https://source.unsplash.com/random', linkText: '지도' }} />
          <Grid container spacing={4}>
            {isArray(featuredPost) && featuredPost.slice(0, 2).map((post) => <FeaturedPost key={post.fstvlNm} post={post} />)}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main />
            <Sidebar
              title={'지도 이용'}
              description={'지도의 중심좌표로 부터 반경 30km 이내의 문화축제 목록이 검색됩니다. 마커에 마우스를 올리면 축제내용에 대해 확인할 수 있습니다.'}
              featuredFestivals={featuredPost}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="" description="" />
    </ThemeProvider>
  );
}

export default Blog;
