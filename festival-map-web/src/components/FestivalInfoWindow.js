import React from 'react';

function FestivalInfoWindow(props) {
  const { festival_fstvlNm, festival_opar, festival_fstvlStartDate, festival_fstvlEndDate, festival_relateInfo, festival_rdnmadr } = props;
  return (
    <div style={{ margin: '10px' }}>
      <h3>{festival_fstvlNm}</h3>
      <p>
        {festival_opar}
        <br />
        {festival_fstvlStartDate && festival_fstvlEndDate && `${festival_fstvlStartDate} ~ ${festival_fstvlEndDate}`}
        <br />
        {festival_relateInfo || festival_rdnmadr}
      </p>
    </div>
  );
}

export default FestivalInfoWindow;
