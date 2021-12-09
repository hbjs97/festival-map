import axios from 'axios';
import _ from 'lodash';

export async function FAXIOS(data, authKey, method, url) {
  try {
    const result = await axios({
      method: method,
      url: url,
      headers: {
        Authorization: authKey,
        'Content-Type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      window.location.replace('/');
      return '토큰 인증 실패';
    }
    return error.response.data.error;
  }
}

export function regexTest(exp, str) {
  const regexp = new RegExp(exp);
  return regexp.test(str);
}
