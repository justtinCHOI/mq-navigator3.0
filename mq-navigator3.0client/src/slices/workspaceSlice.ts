import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWorkspace, postAddWorkspaceMember, postCreateWorkspace, updateWorkspace } from '@api/workspaceApi';
import { updateMemberWorkspaces } from '@slices/memberSlice';
import { IRoute, IWorkspace } from '@typings/db';

// 초기 상태: 단일 Workspace 객체
const initState: IWorkspace = {
  id: 0,
  name: '',
  url: '',
  ownerId: 0,
  members: [],
  routes: [],
  route: null as unknown as IRoute,
};

// 워크스페이스 리스트 가져오기 비동기 액션
export const getWorkspaceAsync = createAsyncThunk('getWorkspacesAsync', async (url: string) => {
  return getWorkspace(url);
});

// 작업이 완료된 후 상태를 업데이트
export const updateWorkspaceStateAsync = createAsyncThunk(
  'updateWorkspaceStateAsync',
  async (workspace: IWorkspace) => {
    return workspace;
  },
);

// 작업이 완료된 후 상태를 업데이트
export const updateWorkspaceAsync = createAsyncThunk('updateWorkspaceAsync', async (workspace: IWorkspace) => {
  return updateWorkspace(workspace);
});

// 워크스페이스 생성 비동기 액션
export const postCreateWorkspaceAsync = createAsyncThunk(
  'postCreateWorkspaceAsync',
  async (workspaceCreateParam: { name: string; url: string }, { dispatch }) => {
    const updatedWorkspaces: IWorkspace[] = await postCreateWorkspace(workspaceCreateParam);
    dispatch(updateMemberWorkspaces(updatedWorkspaces)); // 워크스페이스 업데이트 액션 호출
    return;
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
  reducers: {
    // routes 업데이트 액션
    updateRoutes: (state, action: PayloadAction<IRoute[]>) => {
      state.routes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 워크스페이스 가져오기 성공 시
      .addCase(getWorkspaceAsync.fulfilled, () => {
        console.log('getWorkspaceAsync.fulfilled');
      })
      .addCase(updateWorkspaceStateAsync.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        console.log('updateWorkspaceStateAsync.fulfilled');
        return action.payload;
      })
      .addCase(updateWorkspaceAsync.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        console.log('updateWorkspaceAsync.fulfilled');
        return action.payload;
      })
      // 워크스페이스 생성 성공 시
      .addCase(postCreateWorkspaceAsync.fulfilled, () => {
        console.log('postCreateWorkspaceAsync.fulfilled');
      })
      // 멤버 추가 성공 시
      .addCase(postAddWorkspaceMemberAsync.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        console.log('postAddWorkspaceMemberAsync.fulfilled');
        return action.payload; // 업데이트된 워크스페이스 상태로 덮어쓰기
      })
      .addCase(updateWorkspaceStateAsync.rejected, () => {
        console.log('updateWorkspaceStateAsync.rejected');
      })
      .addCase(getWorkspaceAsync.rejected, () => {
        console.log('getWorkspaceAsync.rejected');
      })
      .addCase(postCreateWorkspaceAsync.rejected, () => {
        console.log('postCreateWorkspaceAsync.rejected');
      })
      .addCase(postAddWorkspaceMemberAsync.rejected, () => {
        console.log('postAddWorkspaceMemberAsync.rejected');
      });
  },
});

export default workspaceSlice.reducer;
