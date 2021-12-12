import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { isArray } from 'lodash';

function Sidebar(props) {
  const { featuredFestivals, description, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        개최 예정
      </Typography>
      {isArray(featuredFestivals) &&
        featuredFestivals.map((festival) => {
          return festival.homepageUrl ? (
            <Link display="block" variant="body1" key={festival.fstvlNm} href={festival.homepageUrl.includes('http') ? festival.homepageUrl : `http://${festival.homepageUrl}`}>
              {festival.fstvlNm}
            </Link>
          ) : (
            <Link display="block" variant="body1" key={festival.fstvlNm}>
              {festival.fstvlNm}
            </Link>
          );
        })}
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;
