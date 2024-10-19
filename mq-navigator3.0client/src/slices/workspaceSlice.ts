import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWorkspaces, postAddWorkspaceMember, postCreateWorkspace } from '@api/workspaceApi';
import { Gate, MemberStatus, Route, Workspace } from '@typings/db';
import { updateMember } from '@slices/memberSlice';

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
    memberRoleList: [],
    memberStatus: MemberStatus.ACTIVE,
    createdAt: null,
    modifiedAt: null,
  },
  members: [],
  route: null as unknown as Route,
  routes: [],
  gates: [],
  isPublic: false,
  usage: 0,
  copyrightHolder: '',
  createdAt: null,
  modifiedAt: null,
};

export const updateWorkspace = createAsyncThunk('updateWorkspace', async (workspace: Workspace) => {
  // 작업이 완료된 후 상태를 업데이트하는 방식으로
  return workspace;
});

// 워크스페이스 리스트 가져오기 비동기 액션
export const getWorkspacesAsync = createAsyncThunk('getWorkspacesAsync', async () => {
  return getWorkspaces();
});

// 워크스페이스 생성 비동기 액션
export const postCreateWorkspaceAsync = createAsyncThunk(
  'postCreateWorkspaceAsync',
  async (workspaceCreateParam: { name: string; url: string }, { dispatch }) => {
    const updatedWorkspaces: Workspace[] = await postCreateWorkspace(workspaceCreateParam);
    dispatch(updateMember(updatedWorkspaces)); // 워크스페이스 업데이트 액션 호출
    return;
  },
);

// Workspace 업데이트 비동기 액션
export const updateWorkspaceAsync = createAsyncThunk('updateWorkspaceAsync', async (workspace: Workspace) => {
  return await updateWorkspaceData(workspace);
});

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
    // gates 업데이트 액션
    updateGates: (state, action: PayloadAction<Gate[]>) => {
      state.gates = action.payload;
    },
    // routes 업데이트 액션
    updateRoutes: (state, action: PayloadAction<Route[]>) => {
      state.routes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateWorkspace.fulfilled, (state, action: PayloadAction<Workspace>) => {
        return action.payload;
      })
      // 워크스페이스 가져오기 성공 시
      .addCase(getWorkspacesAsync.fulfilled, () => {
        console.log('getWorkspacesAsync.fulfilled');
      })
      // 워크스페이스 생성 성공 시
      .addCase(postCreateWorkspaceAsync.fulfilled, () => {
        console.log('postCreateWorkspaceAsync.fulfilled');
      })
      // 멤버 추가 성공 시
      .addCase(postAddWorkspaceMemberAsync.fulfilled, (state, action: PayloadAction<Workspace>) => {
        console.log('postAddWorkspaceMemberAsync.fulfilled');
        return action.payload; // 업데이트된 워크스페이스 상태로 덮어쓰기
      })
      .addCase(updateWorkspaceAsync.fulfilled, (state, action: PayloadAction<Workspace>) => {
        return action.payload;
      })
      .addCase(updateWorkspace.rejected, () => {
        console.log('updateWorkspace.rejected');
      })
      .addCase(getWorkspacesAsync.rejected, () => {
        console.log('getWorkspacesAsync.rejected');
      })
      .addCase(postCreateWorkspaceAsync.rejected, () => {
        console.log('postCreateWorkspaceAsync.rejected');
      })
      .addCase(postAddWorkspaceMemberAsync.rejected, () => {
        console.log('postAddWorkspaceMemberAsync.rejected');
      })
      .addCase(updateWorkspaceAsync.rejected, () => {
        console.log('updateWorkspaceAsync.rejected');
      });
  },
});

export default workspaceSlice.reducer;
