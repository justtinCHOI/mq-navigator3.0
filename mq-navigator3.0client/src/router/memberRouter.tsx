import React from 'react';
import { Suspense, lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const LogInPage = lazy(() => import('@pages/member/LogIn'));
const SignUpPage = lazy(() => import('@pages/member/SignUp'));

const memberRouter = (): RouteObject[] => {
  return [
    {
      path: '',
      element: <Navigate replace to="login" />,
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={Loading}>
          <LogInPage />
        </Suspense>
      ),
    },
    {
      path: 'signup',
      element: (
        <Suspense fallback={Loading}>
          <SignUpPage />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
