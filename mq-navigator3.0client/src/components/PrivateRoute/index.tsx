import { Navigate, useLocation } from 'react-router-dom';
import useCustomMember from '@hooks/useCustomMember';
import React, { FC, PropsWithChildren } from 'react';

interface Props {}

const PrivateRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { isLogin, updateSlicesAfterLogin } = useCustomMember();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/member/login" state={{ from: location }} />;
  } else {
    updateSlicesAfterLogin();
    return children;
  }
};

export default PrivateRoute;
