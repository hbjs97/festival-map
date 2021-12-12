import React from 'react';

function ParkingLotInfoWindow(props) {
  const { ParkingLot_prkplceNm, ParkingLot_rdnmadr, ParkingLot_lnmadr, ParkingLot_operDay, ParkingLot_parkingchrgeInfo, ParkingLot_phoneNumber } = props;
  return (
    <div style={{ margin: '10px' }}>
      <h3>{ParkingLot_prkplceNm}</h3>
      <p>
        {ParkingLot_rdnmadr || ParkingLot_lnmadr}
        <br />
        {ParkingLot_operDay}
        <br />
        {ParkingLot_parkingchrgeInfo}
        <br />
        {ParkingLot_phoneNumber}
      </p>
    </div>
  );
}

export default ParkingLotInfoWindow;
