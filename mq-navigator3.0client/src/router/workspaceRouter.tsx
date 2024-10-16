import React from 'react';
import { Suspense, lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const WorkspaceAnalyze = lazy(() => import('@pages/workspace/Analyze'));
const WorkspaceSetting = lazy(() => import('@pages/workspace/Setting'));

const WorkspaceRouter = (): RouteObject[] => {
  return [
    {
      path: '',
      element: <Navigate replace to="analyze" />,
    },
    {
      path: 'analyze',
      element: (
        <Suspense fallback={Loading}>
          <WorkspaceAnalyze />
        </Suspense>
      ),
    },
    {
      path: 'setting',
      element: (
        <Suspense fallback={Loading}>
          <WorkspaceSetting />
        </Suspense>
      ),
    },
  ];
};

export default WorkspaceRouter;
