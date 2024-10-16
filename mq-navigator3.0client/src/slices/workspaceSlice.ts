import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWorkspaces, postAddWorkspaceMember, postCreateWorkspace } from '@api/workspaceApi';
import { MemberStatus, Workspace } from '@typings/db';
import { updateMember } from '@slices/memberSlice'; // Workspace 타입 임포트

// 초기 상태: 단일 Workspace 객체
const initState: {
  owner: {
    createdAt: string;
    password: string;
    modifiedAt: string;
    name: string;
    nickname: string;
    memberRoleList: any[];
    memberStatus: MemberStatus;
    id: number;
    workspaces: any[];
    email: string;
    ownedWorkspaces: any[];
  };
  routes: any[];
  gates: any[];
  times: any[];
  members: any[];
  name: string;
  id: number;
  url: string;
} = {
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
    createdAt: '',
    modifiedAt: '',
  },
  members: [],
  routes: [],
  times: [],
  gates: [],
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
      });
  },
});

export default workspaceSlice.reducer;
