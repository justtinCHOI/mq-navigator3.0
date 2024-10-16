import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import workspaceRouter from '@router/workspaceRouter';
import memberRouter from '@router/memberRouter';
import PrivateRoute from '@components/PrivateRoute';

const Loading = <div style={{ background: '#F00' }}>Loading.........</div>;
const BasicLayout = lazy(() => import('@layouts/BasicLayout'));
const WorkspaceIndex = lazy(() => import('@pages/workspace'));
const MemberIndex = lazy(() => import('@pages/member'));

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
        path: '',
        element: <Navigate replace to="workspace/mqnavigator/analyze" />,
      },
      {
        path: 'workspace/:url',
        element: (
          <PrivateRoute>
            <Suspense fallback={Loading}>
              <WorkspaceIndex />
            </Suspense>
          </PrivateRoute>
        ),
        children: workspaceRouter(),
      },
      {
        path: 'member',
        element: (
          <Suspense fallback={Loading}>
            <MemberIndex />
          </Suspense>
        ),
        children: memberRouter(),
      },
    ],
  },
]);

export default root;
