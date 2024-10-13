import { getWorkspaceItemsAsync, postCreateWorkspaceAsync } from '@slices/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';

const useCustomWorkspace = () => {
  // 이하 redux
  const workspaces = useSelector((state) => state.workspaceSlice);
  const dispatch = useDispatch();
  const getWorkspace = () => {
    dispatch(getWorkspaceItemsAsync());
  };

  const postCreateWorkspace = (workspaceCreateParam) => {
    dispatch(postCreateWorkspaceAsync(workspaceCreateParam));
  };

  const postAddWorkspaceMember = (workspaceUrl, memberAddParam) => {
    dispatch(postCreateWorkspaceAsync(workspaceUrl, memberAddParam));
  };

  return { workspaces, getWorkspace, postCreateWorkspace, postAddWorkspaceMember };
};
export default useCustomWorkspace;
