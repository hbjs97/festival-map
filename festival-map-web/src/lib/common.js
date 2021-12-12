import axios from 'axios';
import _ from 'lodash';

export async function FAXIOS(data, authKey, method, url) {
  try {
    const result = await axios({
      method: method,
      url: url,
      headers: {
        Authorization: authKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    });
    return result;
  } catch (error) {
    if (error.response?.status == 401) {
      localStorage.clear();
      window.location.replace('/');
      return '토큰 인증 실패';
    }
    console.log(error.response?.data?.message);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
}

export function regexTest(exp, str) {
  const regexp = new RegExp(exp);
  return regexp.test(str);
}
