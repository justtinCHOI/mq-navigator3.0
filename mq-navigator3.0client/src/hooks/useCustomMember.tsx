import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import {
  deleteMemberState,
  getWorkspacesAsync,
  loginPostAsync,
  logoutPostAsync,
  signupPostAsync,
} from '@slices/memberSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { deleteWorkspaceState, updateWorkspaceStateAsync } from '@slices/workspaceSlice';
import { IMember } from '@typings/db';
import { deleteSettingState, getSettingAsync } from '@slices/settingSlice';
import { deleteGatesState, getGatesAsync } from '@slices/gatesSlice';
import { deletePlaybarState } from '@slices/playbarSlice';

const useCustomMember = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const memberState = useSelector((state: RootState) => state.memberSlice);
  const isLogin = !!memberState.email; //----------로그인 여부

  const doSignup = async (singupParam: { email: string; nickname: string; password: string }) => {
    const action = await dispatch(signupPostAsync(singupParam));
    const payload = action.payload as IMember;
    if (payload && payload.workspaces && payload.workspaces.length > 0) {
      const workspaceToUpdate = payload.workspaces[0];
      dispatch(updateWorkspaceStateAsync(workspaceToUpdate));
    }
    return payload;
  };

  const doLogin = async (loginParam: { email: string; password: string }) => {
    const action = await dispatch(loginPostAsync(loginParam));
    const payload = action.payload as IMember;
    if (payload && payload.workspaces && payload.workspaces.length > 0) {
      const workspaceToUpdate = payload.workspaces[0];
      dispatch(updateWorkspaceStateAsync(workspaceToUpdate));
    }
    return payload;
  };
  const doLogout = async () => {
    try {
      await dispatch(logoutPostAsync()).unwrap();
    } catch (error) {
      throw new Error('로그아웃 요청에 실패했습니다.');
    }
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

  const updateSlices = async (url: string) => {
    try {
      const workspacesAction = await dispatch(getWorkspacesAsync());
      const workspaces = workspacesAction.payload;

      if (workspaces && workspaces.length > 0) {
        const settingAction = await dispatch(getSettingAsync(url));
        const setting = settingAction.payload;

        if (setting) {
          await dispatch(getGatesAsync(url));
        }
      } else {
        console.error('No workspaces found or workspaces length is less than 1');
      }
    } catch (error) {
      console.error('Failed to update slices after login:', error);
    }
  };

  const updateUrlAfterLogin = async () => {
    try {
      const workspacesAction = await dispatch(getWorkspacesAsync());
      const workspaces = workspacesAction.payload;

      if (workspaces && workspaces.length > 0) {
        const workspaceToUpdate = workspaces[0].url;
        moveToPath(`/workspace/${workspaceToUpdate}/analyze`);
      } else {
        console.error('No workspaces found or workspaces length is less than 1');
      }
    } catch (error) {
      console.error('Failed to update slices after login:', error);
    }
  };

  const deleteSlices = async () => {
    dispatch(deleteMemberState());
    dispatch(deletePlaybarState());
    dispatch(deleteWorkspaceState());
    dispatch(deleteGatesState());
    dispatch(deleteSettingState());
  };

  return {
    memberState,
    isLogin,
    doSignup,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    updateSlices,
    updateUrlAfterLogin,
    deleteSlices,
  };
};

export default useCustomMember;
