import { API_SERVER_HOST } from '@api/memberApi';
import jwtAxios from '@utils/jwtUtil';
import { IWorkspace } from '@typings/db';

const host = `${API_SERVER_HOST}/api/workspace`;

export const getWorkspace = async (url: string) => {
  const res = await jwtAxios.get(`${host}/${url}`);

  return res.data;
};

export const updateWorkspace = async (workspace: IWorkspace) => {
  const res = await jwtAxios.post(`${host}/`, workspace);

  return res.data;
};

export const postCreateWorkspace = async (workspaceCreateParam: { name: string; url: string }) => {
  const res = await jwtAxios.post(`${host}/`, workspaceCreateParam);

  return res.data;
};

export const postAddWorkspaceMember = async (workspaceUrl: string, memberAddParam: string) => {
  const res = await jwtAxios.post(`${host}/${workspaceUrl}/members`, memberAddParam);

  return res.data;
};
