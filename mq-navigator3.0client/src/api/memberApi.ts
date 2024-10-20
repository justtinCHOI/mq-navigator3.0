import axios from 'axios';
import jwtAxios from '@utils/jwtUtil';

export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam: { email: string; password: string }) => {
  console.log(' loginPost loginParam : ', loginParam);

  // const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  //
  // const params = new URLSearchParams();
  // params.append('email', loginParam.email);
  // params.append('password', loginParam.password);
  //
  // console.log('URLSearchParams:', params.toString());
  //
  // const res = await axios.post(`${host}/login`, params.toString(), header);
  //
  // console.log(' loginPost ', res.data);

  const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };

  const form = new FormData();
  form.append('username', loginParam.email);
  form.append('password', loginParam.password);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const signup = async (singupParam: { email: string; nickname: string; password: string }) => {
  const res = await axios.post(`${API_SERVER_HOST}/api/member/singup`, singupParam);

  return res.data;
};

export const getWorkspaces = async () => {
  try {
    const res = await jwtAxios.get(`${API_SERVER_HOST}/api/member/workspaces`);
    console.log('getWorkspaces data ', res.data);
    return res.data;
  } catch (error: any) {
    console.error('Error fetching workspaces:', error.response?.data);
    throw error; // 오류 발생 시 명확히 알리기 위해 throw
  }
};
