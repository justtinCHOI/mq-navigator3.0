import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginPost } from '@api/memberApi';
import { getCookie, removeCookie, setCookie } from '@utils/cookieUtil';
import { Member, MemberStatus } from '@typings/db';
import {postCreateWorkspaceAsync} from "@slices/workspaceSlice"; // 위에서 정의한 Member 타입을 임포트

const initState: Member = {
  id: 0,
  email: '',
  name: '',
  nickname: '',
  password: '',
  ownedWorkspaces: [],
  workspaces: [],
  memberRoleList: [],
  memberStatus: MemberStatus.INACTIVE,
  createdAt: '',
  modifiedAt: '',
};

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param: any) => {
  return loginPost(param);
});

const loadMemberCookie = (): Member | undefined => {
  // 쿠키에서 로그인 정보 로딩
  const memberInfo = getCookie('member');
  if (memberInfo) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    return JSON.parse(memberInfo) as Member;
  }
  return undefined;
};

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState: loadMemberCookie() || initState, // 쿠키가 없다면 초기값 사용
  reducers: {
    login: (state, action: PayloadAction<Member>) => {
      setCookie('member', JSON.stringify(action.payload), 1); // 1일 동안 쿠키 유지
      return action.payload;
    },
    logout: () => {
      console.log('logout...');
      removeCookie('member');
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action: PayloadAction<Member>) => {
        console.log('fulfilled');
        const payload = action.payload;
        if (!('error' in payload)) {
          setCookie('member', JSON.stringify(payload), 1); // 1일 동안 쿠키 유지
        } else {
          console.log('Login failed:', payload.error);
        }
        return payload;
      })
      // postCreateWorkspaceAsync 요청이 성공했을 때 멤버 정보 업데이트
      .addCase(postCreateWorkspaceAsync.fulfilled, (state, action: PayloadAction<{ member: Member }>) => {
        state.ownedWorkspaces = action.payload.member.ownedWorkspaces; // 소유한 워크스페이스 업데이트
        state.workspaces = action.payload.member.workspaces; // 속한 워크스페이스 업데이트
      })
      .addCase(loginPostAsync.pending, () => {
        console.log('pending');
      })
      .addCase(loginPostAsync.rejected, () => {
        console.log('rejected');
      });
  },
});

export const { login, logout } = memberSlice.actions;

export default memberSlice.reducer;
