import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@pages/workspace/styles';

const MemberPage = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default MemberPage;
