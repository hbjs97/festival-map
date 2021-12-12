import React from 'react';

function FestivalInfoWindow(props) {
  const { Festival_fstvlNm, Festival_opar, Festival_fstvlStartDate, Festival_fstvlEndDate, Festival_relateInfo, Festival_rdnmadr } = props;
  return (
    <div style={{ margin: '10px' }}>
      <h3>{Festival_fstvlNm}</h3>
      <p>
        {Festival_opar}
        <br />
        {Festival_fstvlStartDate && Festival_fstvlEndDate && `${Festival_fstvlStartDate} ~ ${Festival_fstvlEndDate}`}
        <br />
        {Festival_relateInfo || Festival_rdnmadr}
      </p>
    </div>
  );
}

export default FestivalInfoWindow;
