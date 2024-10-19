import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginPost } from '@api/memberApi';
import { getCookie, removeCookie, setCookie } from '@utils/cookieUtil';
import { IMember, IWorkspace } from '@typings/db';

const initState: IMember = {
  id: 0,
  email: '',
  name: '',
  nickname: '',
  password: '',
  workspaces: [],
};

// 로그인 비동기 처리 액션
export const loginPostAsync = createAsyncThunk<IMember, { email: string; password: string }>(
  'loginPostAsync',
  async (param) => {
    const memberInfo = await loginPost(param); // loginPost 결과를 await로 처리
    setCookie('member', JSON.stringify(memberInfo), 1); // 1일 동안 쿠키 유지
    return memberInfo; // memberInfo 반환
  },
);

const loadMemberCookie = (): IMember | undefined => {
  const memberInfo = getCookie('member');

  //닉네임 처리
  if (memberInfo && memberInfo.email) {
    memberInfo.email = decodeURIComponent(memberInfo.email);
  }

  return memberInfo;
};

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState: loadMemberCookie() || initState, // 쿠키가 없다면 초기값 사용
  reducers: {
    login: (state, action: PayloadAction<IMember>) => {
      setCookie('member', JSON.stringify(action.payload), 1); // 1일 동안 쿠키 유지
    },
    logout: () => {
      console.log('logout...');
      removeCookie('member');
      return { ...initState };
    },
    updateMemberWorkspaces: (state, action: PayloadAction<IWorkspace[]>) => {
      state.workspaces = action.payload; // 상태 수정
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action: PayloadAction<IMember>) => {
        console.log('fulfilled');
        const payload = action.payload;
        if (!('error' in payload)) {
          setCookie('member', JSON.stringify(payload), 1); // 1일 동안 쿠키 유지
        } else {
          console.log('Login failed:', payload.error);
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, () => {
        console.log('pending');
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log('Login failed:', action.error.message);
      });
  },
});

export const { login, logout, updateMemberWorkspaces } = memberSlice.actions;

export default memberSlice.reducer;
