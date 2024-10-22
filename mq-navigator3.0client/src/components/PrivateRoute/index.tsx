import { Navigate, useLocation } from 'react-router-dom';
import useCustomMember from '@hooks/useCustomMember';
import React, { useEffect, useState } from 'react';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogin, memberState, updateSlicesAfterLogin } = useCustomMember();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect로 로그인 상태일 때 workspaces가 없을 경우만 호출
  useEffect(() => {
    if (isLogin && !memberState.workspaces) {
      setIsLoading(true);
      updateSlicesAfterLogin().finally(() => setIsLoading(false));
    }
  }, [isLogin, memberState.workspaces, updateSlicesAfterLogin]);

  if (!isLogin) {
    return <Navigate to="/member/login" state={{ from: location }} />;
  }

  if (isLoading) {
    return <div>Loading...Loading</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
