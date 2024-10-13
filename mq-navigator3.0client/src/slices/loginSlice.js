import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPost } from '@api/memberApi';
import { getCookie, removeCookie, setCookie } from '@util/cookieUtil';

const initState = {
  email: '',
};

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param);
});

const loadMemberCookie = () => {
  //쿠키에서 로그인 정보 로딩

  const memberInfo = getCookie('member');

  //닉네임 처리
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo;
};

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie() || initState, //쿠키가 없다면 초깃값사용
  reducers: {
    login: (state, action) => {
      // state : 현재 상태 , action : 동작
      setCookie('member', JSON.stringify(action.payload), 1); //1일
      return action.payload;
    },
    logout: () => {
      console.log('logout....');

      removeCookie('member');
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    // 'loginPostAsync/pending': 비동기 작업이 시작될 때 dispatched
    // 'loginPostAsync/fulfilled': 비동기 작업이 성공적으로 완료될 때 dispatched
    // 'loginPostAsync/rejected': 비동기 작업이 실패할 때 dispatched
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log('fulfilled');
        const payload = action.payload;
        // if (payload.nickname) {
        //     payload.nickname = encodeURIComponent(payload.nickname)
        // }
        //정상적인 로그인시에만 저장
        if (!payload.error) {
          setCookie('member', JSON.stringify(payload), 1); //1일
        }
        return payload; // return 되는 값이 다음 상태를 유지시켜준다.
      })
      .addCase(loginPostAsync.pending, () => {
        console.log('pending');
      })
      .addCase(loginPostAsync.rejected, () => {
        console.log('rejected');
      });
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
