import { Pagination, Stack } from '@mui/material';
import React from 'react';
import { PER_PAGE } from '../../lib/constant';
import PropTypes from 'prop-types';

function PaginationBar(props) {
  const { page, itemCount, handleChangePage } = props;
  return (
    <Stack style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
      <Pagination size="large" count={Math.ceil(itemCount / PER_PAGE) || 1} page={page} onChange={handleChangePage} />
    </Stack>
  );
}

PaginationBar.propTypes = {
  page: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default PaginationBar;
