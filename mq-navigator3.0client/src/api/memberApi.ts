import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam: { email: string; password: string }) => {
  const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };

  const form = new FormData();
  form.append('email', loginParam.email);
  form.append('password', loginParam.password);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const signup = async (singupParam: { email: string; nickname: string; password: string }) => {
  const res = await axios.post(`${API_SERVER_HOST}/api/member/singup`, singupParam);

  return res.data;
};
