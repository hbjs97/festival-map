import React from 'react';

function ParkingLotInfoWindow(props) {
  const { parkingLot_prkplceNm, parkingLot_rdnmadr, parkingLot_lnmadr, parkingLot_operDay, parkingLot_parkingchrgeInfo, parkingLot_phoneNumber } = props;
  return (
    <div style={{ margin: '10px' }}>
      <h3>{parkingLot_prkplceNm}</h3>
      <p>
        {parkingLot_rdnmadr || parkingLot_lnmadr}
        <br />
        {parkingLot_operDay}
        <br />
        {parkingLot_parkingchrgeInfo}
        <br />
        {parkingLot_phoneNumber}
      </p>
    </div>
  );
}

export default ParkingLotInfoWindow;
