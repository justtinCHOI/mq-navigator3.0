import { API_SERVER_HOST } from '@api/memberApi';
import jwtAxios from '@utils/jwtUtil';

const host = `${API_SERVER_HOST}/api/setting`;

export const getSetting = async (url: string) => {
  const res = await jwtAxios.get(`${host}/${url}`);

  return res.data;
};
