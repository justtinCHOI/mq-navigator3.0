// import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:8080';

// const host = `${API_SERVER_HOST}/api/member`;
//
// export const loginPost = async (loginParam: { email: string; password: string }) => {
//   const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };
//
//   const form = new FormData();
//   form.append('email', loginParam.email);
//   form.append('password', loginParam.password);
//
//   const res = await axios.post(`${host}/login`, form, header);
//
//   return res.data;
// };
//
// export const signup = async (singupParam: { email: string; nickname: string; password: string }) => {
//   const res = await axios.post(`${API_SERVER_HOST}/api/member/singup`, singupParam);
//
//   return res.data;
// };

import { memberDummy } from './dummyData'; // 더미 데이터 가져오기
import { MemberRole, MemberStatus } from '@typings/db';

// 로그인 API
export const loginPost = async (loginParam: { email: string; password: string }) => {
  const matchedMember = memberDummy.find(
    (member) => member.email === loginParam.email && member.password === loginParam.password,
  );

  if (matchedMember) {
    // 로그인 성공 시 멤버 정보 반환
    return matchedMember;
  } else {
    throw new Error('Invalid login credentials');
  }
};

// 회원가입 API
export const signup = async (signupParam: { email: string; nickname: string; password: string }) => {
  const isExistingMember = memberDummy.find((member) => member.email === signupParam.email);

  if (isExistingMember) {
    throw new Error('Member already exists with this email');
  }

  // 새로운 멤버 생성 (실제로는 서버에 저장해야 하지만 더미 데이터를 사용하므로 메모리에만 반영)
  const newMember = {
    id: memberDummy.length + 1, // 새로운 ID
    email: signupParam.email,
    name: signupParam.nickname, // Name을 Nickname으로 설정
    nickname: signupParam.nickname,
    password: signupParam.password,
    ownedWorkspaces: [], // 새로 가입한 사용자는 워크스페이스가 없음
    workspaces: [],
    memberRoleList: [MemberRole.USER], // 기본적으로 USER 역할 부여
    memberStatus: MemberStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  };

  memberDummy.push(newMember); // 메모리에 새로운 멤버 추가

  return newMember; // 회원가입 성공 시 멤버 정보 반환
};
