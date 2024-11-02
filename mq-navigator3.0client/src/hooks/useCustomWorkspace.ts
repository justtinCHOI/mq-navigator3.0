import {
  postAddWorkspaceMemberAsync,
  postCreateWorkspaceAsync,
  postRouteAsync,
  updateRoute,
  updateRoutes,
  updateWorkspaceAsync,
  updateWorkspaceStateAsync,
} from '@slices/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { IRoute, IWorkspace } from '@typings/db';

const useCustomWorkspace = () => {
  // 이하 redux
  const dispatch: AppDispatch = useDispatch();
  const { url } = useParams<{ url: string }>(); // URL에서 워크스페이스의 URL 추출
  const memberState = useSelector((state: RootState) => state.memberSlice); // memberSlice에서 상태 가져오기
  const workspaceState = useSelector((state: RootState) => state.workspaceSlice);

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

  const updateWorkspaceAsyncHook = (newWorkspace: IWorkspace) => {
    dispatch(updateWorkspaceAsync(newWorkspace));
  };

  function postRouteAsyncHook(route: IRoute) {
    const workspaceUrl = url;
    if (workspaceUrl) {
      dispatch(postRouteAsync({ workspaceUrl, route }));
    }
  }

  function updateRoutesHook(route: IRoute[]) {
    dispatch(updateRoutes(route));
  }

  function updateRouteHook(route: IRoute) {
    dispatch(updateRoute(route));
  }

  return {
    workspaceState,
    postCreateWorkspace,
    postAddWorkspaceMember,
    updateWorkspaceAsyncHook,
    postRouteAsyncHook,
    updateRoutesHook,
    updateRouteHook,
  };
};
export default useCustomWorkspace;
