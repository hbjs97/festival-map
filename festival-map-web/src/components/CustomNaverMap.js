import React, { useState, useRef, useEffect } from 'react';
import { FAXIOS } from '../lib/common';
import { mapOptions } from '../lib/config';
import { defaultPosition } from '../lib/constant';

function CustomNaverMap(props) {
  const [pos, setPos] = useState(defaultPosition);
  const [festivals, setFestivals] = useState();
  const mapRef = useRef();

  useEffect(() => {
    mapSetting();
  }, []);

  useEffect(() => {
    console.log(pos);
  }, [pos]);

  const mapContents = [
    {
      title: '카페',
      position: {
        x: pos.lat,
        y: pos.lng,
      },
    },
  ];

  const mapSetting = () => {
    const map = new naver.maps.Map('map', mapOptions);

    naver.maps.Event.addListener(map, 'idle', () => {
      setPos({
        lat: map.getCenter()._lat,
        lng: map.getCenter()._lng,
      });
    });

    for (let i = 0; i < mapContents.length; i++) {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(mapContents[i].position.x, mapContents[i].position.y),
        map: map,
        title: mapContents[i].title,
      });
      const infoWindow = new naver.maps.InfoWindow({
        position: new naver.maps.LatLng(marker.position.lat, marker.position.lng),
        content: infoWindowContent,
        maxWidth: 200,
      });

      // 마커에 이벤트 생성
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.map) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
    }

    mapRef.current.focus();
  };

  const infoWindowContent = [
    '<div class="iw_inner">',
    '   <h3>서울특별시청</h3>',
    '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />',
    '       <img src="' + '/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />',
    '       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />',
    '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
    '   </p>',
    '</div>',
  ].join('');

  return (
    <>
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={mapRef}
      />
    </>
  );
}

export default CustomNaverMap;
