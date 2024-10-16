import { Navigate, useLocation } from 'react-router-dom';
import useCustomMember from '@hooks/useCustomMember';
import React, { FC, PropsWithChildren } from 'react';

interface Props {
  // show: boolean;
  // onCloseModal: () => void;
  // style: CSSProperties;
  // closeButton?: boolean;
}

const PrivateRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { isLogin } = useCustomMember();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/member/login" state={{ from: location }} />;
  } else {
    return children;
  }
};

export default PrivateRoute;
