import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { Marker, NaverMap } from 'react-naver-maps';
import { useState } from 'react';

const defaultPosition = { lat: 37.3595704, lng: 127.105399 };

function Main(props) {
  const { title, ref } = props;
  const [pos, setPos] = useState(defaultPosition);

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
      <NaverMap
        mapDivId={'react-naver-map'}
        style={{
          width: '100%',
          height: '50vh',
        }}
        center={pos}
        onIdle={(event) => {
          const newCenter = event.__targets.transformOrigin_px.target.center;
          setPos({ lat: newCenter._lat, lng: newCenter._lng });
        }}
        defaultZoom={15}
      >
        <Marker
          key={1}
          position={pos}
          animation={0}
          onClick={() => {
            alert('여기는 N서울타워입니다.');
          }}
        />
      </NaverMap>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Main;
