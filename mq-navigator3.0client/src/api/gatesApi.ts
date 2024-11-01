import { API_SERVER_HOST } from '@api/memberApi';
import jwtAxios from '@utils/jwtUtil';
import { NullableIGate } from '@typings/db';

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

export const updateGates = async (url: string, gates: NullableIGate[]) => {
  try {
    console.log('gatesApi updateGates beforeReq : ', gates);
    const res = await jwtAxios.post(`${host}/${url}`, gates);
    console.log('gatesApi updateGates res.data : ', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching setting:', error);
  }
};
