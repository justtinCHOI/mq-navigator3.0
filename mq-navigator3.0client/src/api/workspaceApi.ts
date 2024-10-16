// import { API_SERVER_HOST } from '@api/memberApi';
// import jwtAxios from '@utils/jwtUtil';
//
// const host = `${API_SERVER_HOST}/api/workspaces`;
//
// export const getWorkspace = async () => {
//   const res = await jwtAxios.get(`${host}/`);
//
//   return res.data;
// };
//
// export const postCreateWorkspace = async (workspaceCreateParam: { name: string; url: string }) => {
//   const res = await jwtAxios.post(`${host}/`, workspaceCreateParam);
//
//   return res.data;
// };
//
// export const postAddWorkspaceMember = async (workspaceUrl: string, memberAddParam: string) => {
//   const res = await jwtAxios.post(`${host}/${workspaceUrl}/members`, memberAddParam);
//
//   return res.data;
// };

// src/api/workspaceApi.ts

import { workspaceDummy, memberDummy } from './dummyData'; // 더미 데이터 가져오기
import { Workspace } from '@typings/db';

// 워크스페이스 가져오기
export const getWorkspaces = async (): Promise<Workspace[]> => {
  // 모든 워크스페이스 목록 반환
  return workspaceDummy;
};

// 워크스페이스 생성
export const postCreateWorkspace = async (workspaceCreateParam: { name: string; url: string }): Promise<Workspace[]> => {
  // 중복된 워크스페이스 URL이 있는지 확인
  const existingWorkspace = workspaceDummy.find((ws) => ws.url === workspaceCreateParam.url);
  if (existingWorkspace) {
    throw new Error('Workspace with this URL already exists');
  }

  // 새로운 워크스페이스 생성
  const newWorkspace: Workspace = {
    id: workspaceDummy.length + 1,
    name: workspaceCreateParam.name,
    url: workspaceCreateParam.url,
    owner: memberDummy[0], // 기본적으로 첫 번째 멤버를 소유자로 설정 (임의로 설정)
    members: [memberDummy[0]], // 기본적으로 소유자를 멤버로 추가
    routes: [],
    times: [new Date().toISOString()],
    gates: [],
    isPublic: true,
    usage: 100,
    copyrightHolder: memberDummy[0].name,
  };

  workspaceDummy.push(newWorkspace); // 더미 데이터 배열에 새 워크스페이스 추가

  return workspaceDummy;
};

// 워크스페이스 멤버 추가
export const postAddWorkspaceMember = async (workspaceUrl: string, memberAddParam: string): Promise<Workspace> => {
  // 해당 워크스페이스 찾기
  const targetWorkspace = workspaceDummy.find((ws) => ws.url === workspaceUrl);
  if (!targetWorkspace) {
    throw new Error('Workspace not found');
  }

  // 해당 이메일로 멤버 찾기
  const targetMember = memberDummy.find((member) => member.email === memberAddParam);
  if (!targetMember) {
    throw new Error('Member not found');
  }

  // 워크스페이스에 멤버 추가
  if (!targetWorkspace.members.some((member) => member.email === targetMember.email)) {
    targetWorkspace.members.push(targetMember); // 중복되지 않으면 추가
  }

  return targetWorkspace; // 업데이트된 워크스페이스 반환
};
