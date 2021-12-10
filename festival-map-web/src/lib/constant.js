// 주소 관련
export const STAGING = 'http://localhost:6100';

export const API_ROUTE = {};

export const PER_PAGE = 10;

export const TOKEN_ERROR = 'TOKEN_ERROR';

export const REG_ENG_NUM = /^[a-zA-Z0-9]+$/;
export const REG_ENG_NUM_SPECIAL = /^[a-zA-Z0-9!@#$%^&*]{4,20}$/;
export const REG_ENG_NUM_KR = /^[a-zA-Z0-9\uac00-\ud7af]+$/;
export const REG_MOBILE_PHONE = /^\d{3}-\d{3,4}-\d{4}$/;
export const REG_PHONE = /^\d{2,3}-\d{3,4}-\d{4}$/;
export const REG_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REG_COMPANY_REGISTRATION = /^[\d{3}-\d{2}-\d{5}]{12}$/;
export const REG_NUMBER = /^\d+$/;
export const WON = /\B(?=(\d{3})+(?!\d))/g;

export const COPY_RIGHT_URL = 'http://210.117.182.234:8080';

export const defaultPosition = { lat: 37.3595704, lng: 127.105399 };
