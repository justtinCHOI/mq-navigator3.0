import { API_SERVER_HOST } from '@api/memberApi';
import jwtAxios from '@utils/jwtUtil';
import { ISetting } from '@typings/db';

const host = `${API_SERVER_HOST}/api/setting`;

export const getSetting = async (url: string) => {
  try {
    const res = await jwtAxios.get(`${host}/${url}`);
    console.log('settingApi getSetting res.data : ', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching setting:', error);
  }
};

export const updateSetting = async (url: string, setting: ISetting) => {
  try {
    console.log('settingApi updateSetting beforeReq : ', setting);
    const res = await jwtAxios.post(`${host}/${url}`, setting);
    console.log('settingApi updateSetting res.data : ', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching setting:', error);
  }
};
