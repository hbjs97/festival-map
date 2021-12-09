import { Link, Typography } from '@mui/material';
import React from 'react';
import { COPY_RIGHT_URL } from '../lib/constant';

function Copyright(props) {
  const { sx } = props;
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...sx}>
      {'Copyright © '}
      <Link color="inherit" href={COPY_RIGHT_URL}>
        Festival Map
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
