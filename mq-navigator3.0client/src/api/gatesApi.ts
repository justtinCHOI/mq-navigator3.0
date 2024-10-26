import { API_SERVER_HOST } from '@api/memberApi';
import jwtAxios from '@utils/jwtUtil';

const host = `${API_SERVER_HOST}/api/gate`;

export const getGates = async (url: string) => {
  try {
    const res = await jwtAxios.get(`${host}/${url}`);
    console.log('gatesApi getGates res.data : ', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching setting:', error);
  }
};
