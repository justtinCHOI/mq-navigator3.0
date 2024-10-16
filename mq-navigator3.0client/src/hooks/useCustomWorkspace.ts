import {
  getWorkspacesAsync,
  postAddWorkspaceMemberAsync,
  postCreateWorkspaceAsync,
  updateWorkspace,
} from '@slices/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Member, Workspace } from '@typings/db';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const useCustomWorkspace = () => {
  // 이하 redux
  const workspaces = useSelector((state: RootState) => state.workspaceSlice);
  const dispatch: AppDispatch = useDispatch();
  const { url } = useParams<{ url: string }>(); // URL에서 워크스페이스의 URL 추출
  const memberState = useSelector((state: RootState) => state.memberSlice); // memberSlice에서 상태 가져오기
  const workspaceState = useSelector((state: RootState) => state.workspaceSlice);

  const getWorkspace = () => {
    dispatch(getWorkspacesAsync());
  };

  const postCreateWorkspace = (workspaceCreateParam: { name: string; url: string }) => {
    dispatch(postCreateWorkspaceAsync(workspaceCreateParam));
  };

  const postAddWorkspaceMember = (workspaceUrl: string, memberAddParam: string) => {
    dispatch(postAddWorkspaceMemberAsync({ workspaceUrl, memberAddParam }));
  };

  // 워크스페이스 업데이트 (로그인 후 워크스페이스 정보 업데이트)
  const updateWorkspaceWithMember = (memberState: Member) => {
    // login 성공 시 workspaces[1] 정보를 workspaceSlice에 업데이트
    if (memberState.workspaces && memberState.workspaces.length > 1) {
      const workspaceToUpdate = memberState.workspaces[1];
      dispatch(updateWorkspace(workspaceToUpdate)); // 워크스페이스 업데이트 액션 호출
    }
  };

  useEffect(() => {
    // URL이 변경될 때마다 workspaceSlice를 업데이트
    if (memberState?.workspaces) {
      const selectedWorkspace = memberState.workspaces.find((workspace: Workspace) => workspace.url === url);
      if (selectedWorkspace) {
        dispatch(updateWorkspace(selectedWorkspace));
      }
    }
  }, [url, memberState?.workspaces, dispatch]);

  return {
    workspaceState,
    workspaces,
    getWorkspace,
    postCreateWorkspace,
    postAddWorkspaceMember,
    updateWorkspaceWithMember,
  };
};
export default useCustomWorkspace;
