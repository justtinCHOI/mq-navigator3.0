import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import workspaceRouter from '@router/workspaceRouter';
import memberRouter from '@router/memberRouter';
import PrivateRoute from '@components/PrivateRoute';

const Loading = <div style={{ background: '#F00' }}>Loading.........</div>;
const BasicLayout = lazy(() => import('@layouts/BasicLayout'));

const root = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={Loading}>
        <BasicLayout />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={Loading}>
            <Navigate replace to="/workspace/:url/analyze" />,
          </Suspense>
        ),
      },
      {
        path: 'workspace/:url',
        element: <PrivateRoute></PrivateRoute>,
        children: workspaceRouter(),
      },
      {
        path: 'member',
        children: memberRouter(),
      },
    ],
  },
]);

export default root;
