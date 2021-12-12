import { isArray } from 'lodash';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { FAXIOS } from '../lib/common';
import { mapOptions } from '../lib/config';
import { defaultPosition, mapRadius, STAGING } from '../lib/constant';
import FestivalInfoWindow from './FestivalInfoWindow';

function FestivalMap(props) {
  const [pos, setPos] = useState(defaultPosition);
  const [festivals, setFestivals] = useState();
  const mapRef = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    setMap(new naver.maps.Map('map', mapOptions));
  }, []);

  useEffect(() => {
    map && initNaverMap();
    getFestivals();
  }, [map]);

  useEffect(() => {
    getFestivals();
  }, [pos]);

  async function getFestivals() {
    isArray(festivals) &&
      festivals?.forEach((v) => {
        v.setMap(null);
      });
    const res = await FAXIOS(null, null, 'get', `${STAGING}/api/festivals?latitude=${pos.lat}&longitude=${pos.lng}&radius=${mapRadius}`);
    if (res.status >= 400) {
      alert(res);
      return;
    }
    const markers = res.data?.map((v, index) => {
      return makeMarker(map, v, new naver.maps.LatLng(v.Festival_latitude, v.Festival_longitude), index);
    });
    setFestivals(markers);
  }

  function makeMarker(map, info, position, index) {
    const HOME_PATH = window.HOME_PATH || '.';
    const ICON_GAP = 31;
    const iconSpritePositionX = index * ICON_GAP + 1;
    const iconSpritePositionY = 1;

    const marker = new naver.maps.Marker({
      map: map,
      position: position,
      icon: {
        url: HOME_PATH,
        size: new naver.maps.Size(26, 36), // 이미지 크기
        origin: new naver.maps.Point(iconSpritePositionX, iconSpritePositionY), // 스프라이트 이미지에서 클리핑 위치
        anchor: new naver.maps.Point(13, 36), // 지도상 위치에서 이미지 위치의 offset
        scaledSize: new naver.maps.Size(395, 79),
      },
    });

    const infoWindow = new naver.maps.InfoWindow({
      position: new naver.maps.LatLng(marker.position.lat, marker.position.lng),
      content: ReactDOMServer.renderToString(<FestivalInfoWindow {...info} />),
      maxWidth: 200,
      disableAutoPan: true,
    });

    naver.maps.Event.addListener(marker, 'mouseover', () => {
      infoWindow.open(map, marker);
    });
    naver.maps.Event.addListener(marker, 'mouseout', () => {
      infoWindow.close();
    });

    return marker;
  }

  function initNaverMap() {
    naver.maps.Event.addListener(map, 'idle', () => {
      setPos({
        lat: map.getCenter()._lat,
        lng: map.getCenter()._lng,
      });
    });
    mapRef.current.focus();
  }

  return (
    <>
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={mapRef}
        {...props}
      />
    </>
  );
}

export default FestivalMap;
