import axios from 'axios';
import jwtAxios from '@utils/jwtUtil';

export const API_SERVER_HOST =
  process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_API_SERVER_DEV : process.env.REACT_APP_API_SERVER_PROD;

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam: { email: string; password: string }) => {
  console.log(' loginPost loginParam : ', loginParam);
  console.log('   process.env.NODE_ENV : ', process.env.NODE_ENV);

  const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };

  const form = new FormData();
  form.append('username', loginParam.email);
  form.append('password', loginParam.password);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const signupPost = async (singupParam: { email: string; nickname: string; password: string }) => {
  const res = await axios.post(`${host}/singup`, singupParam);

  return res.data;
};

export const logoutPost = async () => {
  try {
    const response = await jwtAxios.post(`${host}/logout`);
    return response.data;
  } catch (error) {
    console.error('로그아웃 API 요청 실패:', error);
    throw error;
  }
};

export const getWorkspaces = async () => {
  try {
    const res = await jwtAxios.get(`${host}/workspaces`);
    console.log('memberApi getWorkspaces data ', res.data);
    return res.data;
  } catch (error: any) {
    console.error('Error fetching workspaces:', error.response?.data);
    throw error; // 오류 발생 시 명확히 알리기 위해 throw
  }
};
