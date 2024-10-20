import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import { getWorkspacesAsync, loginPostAsync, logout } from '@slices/memberSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateWorkspaceStateAsync } from '@slices/workspaceSlice';
import { IMember } from '@typings/db';

const useCustomMember = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const memberState = useSelector((state: RootState) => state.memberSlice);
  const isLogin = !!memberState.email; //----------로그인 여부

  const doLogin = async (loginParam: { email: string; password: string }) => {
    const action = await dispatch(loginPostAsync(loginParam));
    const payload = action.payload as IMember;
    // 워크스페이스 업데이트 액션 호출
    if (payload && payload.workspaces && payload.workspaces.length > 0) {
      const workspaceToUpdate = payload.workspaces[0];
      dispatch(updateWorkspaceStateAsync(workspaceToUpdate));
    }
    return payload;
  };
  const doLogout = () => {
    dispatch(logout());
  };

  const moveToPath = (path: string) => {
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    navigate({ pathname: '/member/login' }, { replace: true });
  };

  const moveToLoginReturn = () => {
    //----------------------로그인 페이지로 이동 컴포넌트 // 조건부 기반
    return <Navigate replace to="/member/login" />;
  };

  const updateSlicesAfterLogin = () => {
    dispatch(getWorkspacesAsync());
    console.log('workspaces : ', memberState.workspaces);
    if (memberState.workspaces && memberState.workspaces.length > 1) {
      const workspaceToUpdate = memberState.workspaces[1];
      moveToPath(`/workspace/${workspaceToUpdate}/`);
    }
  };

  return {
    memberState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    updateSlicesAfterLogin,
  };
};

export default useCustomMember;
