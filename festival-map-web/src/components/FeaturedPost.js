import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function FeaturedPost(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={post.homepageUrl ? (post.homepageUrl.includes('http') ? post.homepageUrl : `http://${post.homepageUrl}`) : undefined}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.fstvlNm}
            </Typography>
            {post.fstvlStartDate && (
              <Typography variant="subtitle1" color="text.secondary">
                {`${post.fstvlStartDate} ~ ${post.fstvlEndDate}`}
              </Typography>
            )}
            {post.opar && (
              <Typography variant="subtitle1" paragraph>
                {post.opar}
              </Typography>
            )}
            {post.phoneNumber && (
              <Typography variant="subtitle1" paragraph>
                {post.phoneNumber}
              </Typography>
            )}
            <Typography variant="subtitle1" paragraph>
              {post.rdnmadr || post.lnmadr}
            </Typography>
          </CardContent>
          {<CardMedia component="img" sx={{ width: 160, display: { xs: 'none', sm: 'block' } }} image={'https://source.unsplash.com/random'} />}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;
