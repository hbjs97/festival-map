import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function MultilineTextField(props) {
  return (
    <div>
      <TextField id="outlined-multiline-static" fullWidth name={'default'} margin="normal" variant="outlined" {...props} />
    </div>
  );
}

MultilineTextField.defaultProps = {
  rows: 10,
  placeholder: '댓글',
  multiline: true,
};

MultilineTextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  multiline: PropTypes.bool,
  sx: PropTypes.object,
};

export default MultilineTextField;
