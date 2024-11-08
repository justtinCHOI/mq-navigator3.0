import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWorkspaces, loginPost, logoutPost, signupPost } from '@api/memberApi';
import { getCookie, removeCookie, setCookie } from '@utils/cookieUtil';
import { IMember, IWorkspace, memberSliceState } from '@typings/db';

const initState: memberSliceState = {
  id: 0,
  email: '',
  name: '',
  nickname: '',
  password: '',
  workspaces: [],
  accessToken: '',
  refreshToken: '',
};

const loadMemberCookie = (): IMember | undefined => {
  const memberInfo = getCookie('member');

  //닉네임 처리
  if (memberInfo && memberInfo.email) {
    memberInfo.email = decodeURIComponent(memberInfo.email);
  }

  return memberInfo;
};

// 로그인 비동기 처리 액션
export const loginPostAsync = createAsyncThunk('loginPostAsync', async (param: { email: string; password: string }) => {
  const memberInfo = await loginPost(param);
  setCookie('member', JSON.stringify(memberInfo), 1); // 1일 동안 쿠키 유지
  return memberInfo;
});

// 로그인 비동기 처리 액션
export const signupPostAsync = createAsyncThunk(
  'signupPostAsync',
  async (singupParam: { email: string; nickname: string; password: string }) => {
    const memberInfo = await signupPost(singupParam);
    setCookie('member', JSON.stringify(memberInfo), 1); // 1일 동안 쿠키 유지
    return memberInfo;
  },
);

// 로그아웃 비동기 처리 액션
export const logoutPostAsync = createAsyncThunk('logoutPostAsync', async () => {
  try {
    const response = await logoutPost();
    removeCookie('member');
    return response;
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
    throw error;
  }
});

export const getWorkspacesAsync = createAsyncThunk('getWorkspacesAsync', async () => {
  return await getWorkspaces();
});

// 비동기 로그인 액션 생성
export const loginStateAsync = createAsyncThunk<memberSliceState, memberSliceState>(
  'loginStateAsync',
  async (memberState: memberSliceState) => {
    // 실제 로그인 로직 수행 후 필요한 데이터 반환
    setCookie('member', JSON.stringify(memberState), 1); // 1일 동안 쿠키 유지
    return memberState;
  },
);

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState: loadMemberCookie() || initState, // 쿠키가 없다면 초기값 사용
  reducers: {
    logout: () => {
      removeCookie('member');
      return { ...initState };
    },
    updateMemberWorkspaces: (state, action: PayloadAction<IWorkspace[]>) => {
      state.workspaces = action.payload; // 상태 수정
    },
    deleteMemberState: () => initState, // 초기 상태로 되돌리는 deleteState 리듀서 추가
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action: PayloadAction<IMember>) => {
        console.log('loginPostAsync.fulfilled');
        const payload = action.payload;
        if (!('error' in payload)) {
          setCookie('member', JSON.stringify(payload), 1); // 1일 동안 쿠키 유지
        } else {
          console.log('Login failed:', payload.error);
        }
        return payload;
      })
      .addCase(signupPostAsync.fulfilled, (state, action: PayloadAction<IMember>) => {
        console.log('signupPostAsync.fulfilled');
        const payload = action.payload;
        if (!('error' in payload)) {
          setCookie('member', JSON.stringify(payload), 1); // 1일 동안 쿠키 유지
        } else {
          console.log('Login failed:', payload.error);
        }
        return payload;
      })
      .addCase(getWorkspacesAsync.fulfilled, (state, action: PayloadAction<IWorkspace[]>) => {
        state.workspaces = action.payload;
      })
      .addCase(loginStateAsync.fulfilled, (state, action: PayloadAction<IMember>) => {
        return action.payload;
      })
      .addCase(logoutPostAsync.fulfilled, () => {
        return initState;
      })
      .addCase(loginPostAsync.pending, () => {
        console.log('loginPostAsync pending');
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log('loginPostAsync failed:', action.error.message);
      })
      .addCase(loginStateAsync.rejected, (state, action) => {
        console.log('loginStateAsync failed:', action.error.message);
      })
      .addCase(logoutPostAsync.rejected, (state, action) => {
        console.log('logoutPostAsync failed:', action.error.message);
      });
  },
});

export const { updateMemberWorkspaces, deleteMemberState } = memberSlice.actions;

export default memberSlice.reducer;
