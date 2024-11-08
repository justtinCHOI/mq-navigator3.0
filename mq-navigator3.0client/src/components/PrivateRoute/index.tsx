import { Navigate, useLocation } from 'react-router-dom';
import useCustomMember from '@hooks/useCustomMember';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UseCustomSetting from '@hooks/useCustomSetting';
import UseCustomGates from '@hooks/useCustomGates';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogin, memberState, updateSlices } = useCustomMember();
  const { settingState } = UseCustomSetting();
  const { gatesState } = UseCustomGates();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useParams<{ url: string }>(); // URL에서 워크스페이스의 URL 추출

  useEffect(() => {
    if (isLogin && url && (!memberState.workspaces || settingState.id == 0 || gatesState.length == 0)) {
      setIsLoading(true);
      updateSlices(url).finally(() => setIsLoading(false));
    }
  }, [gatesState, isLogin, memberState.workspaces, settingState, updateSlices, url]);

  if (!isLogin) {
    return <Navigate to="/member/login" state={{ from: location }} />;
  }

  if (isLoading) {
    return <div>Loading...Loading</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
