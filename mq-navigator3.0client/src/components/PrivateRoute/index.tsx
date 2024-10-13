import { Navigate, useLocation } from 'react-router-dom';
import useCustomLogin from '@hooks/useCustomLogin';
import { FC, PropsWithChildren } from 'react';

interface Props {
  // show: boolean;
  // onCloseModal: () => void;
  // style: CSSProperties;
  // closeButton?: boolean;
}

const PrivateRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { isLogin } = useCustomLogin();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/member/login" state={{ from: location }} />;
  } else {
    return children;
  }
};

export default PrivateRoute;
