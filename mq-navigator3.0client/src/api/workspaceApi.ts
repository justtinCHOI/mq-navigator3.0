import { API_SERVER_HOST } from '@api/memberApi';
import jwtAxios from '@utils/jwtUtil';
import { IRoute, IWorkspace } from '@typings/db';

const host = `${API_SERVER_HOST}/api/workspace`;

export const getWorkspace = async (url: string) => {
  const res = await jwtAxios.get(`${host}/${url}`);

  return res.data;
};

export const updateWorkspace = async (workspace: IWorkspace) => {
  const res = await jwtAxios.put(`${host}/`, workspace);

  return res.data;
};

export const postCreateWorkspace = async (workspaceCreateParam: { name: string; url: string }) => {
  const response = await jwtAxios.post(`${host}/`, workspaceCreateParam);

  // 응답 상태 코드가 성공 범위(200~299)에 있는지 확인
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error('Failed to create workspace');
  }
};

export const postAddWorkspaceMember = async (workspaceUrl: string, memberAddParam: string) => {
  const res = await jwtAxios.post(`${host}/${workspaceUrl}/members`, memberAddParam);

  return res.data;
};

export const postRoute = async (workspaceUrl: string, route: IRoute) => {
  const res = await jwtAxios.post(`${host}/${workspaceUrl}/route`, route);

  return res.data;
};
