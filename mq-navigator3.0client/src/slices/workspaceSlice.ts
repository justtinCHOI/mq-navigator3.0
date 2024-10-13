import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWorkspace, postAddWorkspaceMember, postCreateWorkspace } from '@api/workspaceApi';
import { Workspace } from '@typings/db'; // Workspace 타입 임포트

// 초기 상태: 단일 Workspace 객체
const initState: Workspace = {
  id: 0,
  name: '',
  url: '',
  owner: {
    id: 0,
    email: '',
    name: '',
    nickname: '',
    password: '',
    ownedWorkspaces: [],
    workspaces: [],
    routes: [],
    memberRoleList: [],
    memberStatus: 'ACTIVE',
    createdAt: '',
    modifiedAt: '',
  },
  members: [],
  routes: [],
  times: [],
  gates: [],
};

// 워크스페이스 리스트 가져오기 비동기 액션
export const getWorkspaceItemsAsync = createAsyncThunk('getWorkspaceItemsAsync', async () => {
  return getWorkspace();
});

// 워크스페이스 생성 비동기 액션
export const postCreateWorkspaceAsync = createAsyncThunk(
  'postCreateWorkspaceAsync',
  async (workspaceCreateParam: any) => {
    return postCreateWorkspace(workspaceCreateParam);
  },
);

// 워크스페이스 멤버 추가 비동기 액션
export const postAddWorkspaceMemberAsync = createAsyncThunk(
  'postAddWorkspaceMemberAsync',
  async ({ workspaceUrl, memberAddParam }: { workspaceUrl: string; memberAddParam: any }) => {
    return postAddWorkspaceMember(workspaceUrl, memberAddParam);
  },
);

// 워크스페이스 Slice 정의
const workspaceSlice = createSlice({
  name: 'workspaceSlice',
  initialState: initState, // 단일 워크스페이스로 초기화
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 워크스페이스 가져오기 성공 시
      .addCase(getWorkspaceItemsAsync.fulfilled, (state, action: PayloadAction<Workspace>) => {
        console.log('getWorkspaceItemsAsync.fulfilled');
        return action.payload; // 단일 워크스페이스 객체로 상태 업데이트
      })
      // 워크스페이스 생성 성공 시
      .addCase(postCreateWorkspaceAsync.fulfilled, (state, action: PayloadAction<{ workspace: Workspace }>) => {
        console.log('postCreateWorkspaceAsync.fulfilled');
        return action.payload.workspace; // 생성된 워크스페이스로 상태 업데이트
      })
      // 멤버 추가 성공 시
      .addCase(postAddWorkspaceMemberAsync.fulfilled, (state, action: PayloadAction<Workspace>) => {
        console.log('postAddWorkspaceMemberAsync.fulfilled');
        return action.payload; // 업데이트된 워크스페이스 상태로 덮어쓰기
      })
      // 워크스페이스 가져오기 실패 시 에러 처리
      .addCase(getWorkspaceItemsAsync.rejected, (state, action) => {
        console.error('getWorkspaceItemsAsync.rejected', action.error);
        state.error = action.error?.message || null; // 기본값 설정
      })
      // 워크스페이스 생성 실패 시 에러 처리
      .addCase(postCreateWorkspaceAsync.rejected, (state, action) => {
        console.error('postCreateWorkspaceAsync.rejected', action.error);
        state.error = action.error?.message || null; // 기본값 설정
      })
      // 로딩 상태 처리
      .addCase(getWorkspaceItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCreateWorkspaceAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

export default workspaceSlice.reducer;
