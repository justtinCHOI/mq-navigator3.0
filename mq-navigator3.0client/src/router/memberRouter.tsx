import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const LoginPage = lazy(() => import('@pages/member/LogIn'));
const LogoutPage = lazy(() => import('@pages/member/SignUp'));

const memberRouter = (): RouteObject[] => {
  return [
    {
      path: 'login',
      element: (
        <Suspense fallback={Loading}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: 'logout',
      element: (
        <Suspense fallback={Loading}>
          <LogoutPage />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
