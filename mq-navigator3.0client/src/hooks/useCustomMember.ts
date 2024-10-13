import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import { loginPostAsync, logout } from '@slices/memberSlice';
import { useDispatch, useSelector } from 'react-redux';

const useCustomMember = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const memberState = useSelector((state) => state.memberSlice);

  const isLogin = !!memberState.email; //----------로그인 여부

  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));
    return action.payload;
  };

  const doLogout = () => {
    dispatch(logout());
  };

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    navigate({ pathname: '/member/login' }, { replace: true });
  };

  const moveToLoginReturn = () => {
    //----------------------로그인 페이지로 이동 컴포넌트 // 조건부 기반
    return <Navigate replace to="/member/login" />;
  };

  return { memberState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn };
};

export default useCustomMember;
