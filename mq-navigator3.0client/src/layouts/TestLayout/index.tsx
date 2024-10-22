import React from 'react';
import { Outlet } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      테스트 레이아웃입니다.
      <Outlet />
    </div>
  );
};

export default Index;
