import { defaultPosition } from './constant';

export const mapOptions = {
  center: new naver.maps.LatLng(defaultPosition),
  zoom: 15,
  zoomControl: true,
  zoomControlOptions: {
    style: naver.maps.ZoomControlStyle,
    position: naver.maps.Position.TOP_RIGHT,
  },
};
