import {
  getWorkspaceAsync,
  postAddWorkspaceMemberAsync,
  postCreateWorkspaceAsync,
  updateWorkspaceStateAsync,
} from '@slices/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { IMember, IWorkspace } from '@typings/db';
import {getWorkspacesAsync} from "@slices/memberSlice";

const useCustomWorkspace = () => {
  // 이하 redux
  const workspaces = useSelector((state: RootState) => state.workspaceSlice);
  const dispatch: AppDispatch = useDispatch();
  const { url } = useParams<{ url: string }>(); // URL에서 워크스페이스의 URL 추출
  const memberState = useSelector((state: RootState) => state.memberSlice); // memberSlice에서 상태 가져오기
  const workspaceState = useSelector((state: RootState) => state.workspaceSlice);

  const getWorkspace = (url: string) => {
    dispatch(getWorkspaceAsync(url));
  };

  const postCreateWorkspace = (workspaceCreateParam: { name: string; url: string }) => {
    dispatch(postCreateWorkspaceAsync(workspaceCreateParam));
  };

  const postAddWorkspaceMember = (workspaceUrl: string, memberAddParam: string) => {
    dispatch(postAddWorkspaceMemberAsync({ workspaceUrl, memberAddParam }));
  };

  useEffect(() => {
    // URL이 변경될 때마다 workspaceSlice를 업데이트
    if (memberState?.workspaces) {
      const selectedWorkspace = memberState.workspaces.find((workspace: IWorkspace) => workspace.url === url);
      if (selectedWorkspace) {
        dispatch(updateWorkspaceStateAsync(selectedWorkspace));
      }
    }
  }, [url, memberState?.workspaces, dispatch]);

  return {
    workspaceState,
    workspaces,
    getWorkspace,
    postCreateWorkspace,
    postAddWorkspaceMember,
  };
};
export default useCustomWorkspace;
