import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ margin: 20 }}>
      <h1>404 Not found</h1>
      <p style={{ textAlign: 'left', fontSize: 30 }}>
        <Link to="/~s201711456">Go to Home </Link>
      </p>
    </div>
  );
}

export default NotFound;
