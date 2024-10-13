import { getWorkspaceItemsAsync, postAddWorkspaceMemberAsync, postCreateWorkspaceAsync } from '@slices/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

const useCustomWorkspace = () => {
  // 이하 redux
  const workspaces = useSelector((state: RootState) => state.workspaceSlice);
  const dispatch: AppDispatch = useDispatch();
  const getWorkspace = () => {
    dispatch(getWorkspaceItemsAsync());
  };

  const postCreateWorkspace = (workspaceCreateParam: { name: string; url: string }) => {
    dispatch(postCreateWorkspaceAsync(workspaceCreateParam));
  };

  const postAddWorkspaceMember = (workspaceUrl: string, memberAddParam: string) => {
    dispatch(postAddWorkspaceMemberAsync({ workspaceUrl, memberAddParam }));
  };

  return { workspaces, getWorkspace, postCreateWorkspace, postAddWorkspaceMember };
};
export default useCustomWorkspace;
