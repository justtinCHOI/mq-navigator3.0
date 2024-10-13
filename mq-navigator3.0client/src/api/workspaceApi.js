import { API_SERVER_HOST } from '@api/todoApi';
import jwtAxios from '@util/jwtUtil';

const host = `${API_SERVER_HOST}/api/workspaces`;

export const getWorkspace = async () => {
  const res = await jwtAxios.get(`${host}/`);

  return res.data;
};

export const postCreateWorkspace = async (workspaceCreateParam) => {
  const res = await jwtAxios.post(`${host}/`, workspaceCreateParam);

  return res.data;
};

export const postAddWorkspaceMember = async (workspaceUrl, memberAddParam) => {
  const res = await jwtAxios.post(`${host}/${workspaceUrl}/members`, memberAddParam);

  return res.data;
};
