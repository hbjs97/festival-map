import { defaultPosition } from './constant';

export const mapOptions = {
  center: new naver.maps.LatLng(defaultPosition),
  zoom: 13,
  minZoom: 10,
  maxZoom: 17,
  zoomControl: true,
  zoomControlOptions: {
    style: naver.maps.ZoomControlStyle,
    position: naver.maps.Position.TOP_RIGHT,
  },
};
