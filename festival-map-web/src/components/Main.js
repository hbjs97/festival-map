import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import FestivalMap from './FestivalMap';

function Main() {
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <FestivalMap />
    </Grid>
  );
}

export default Main;
