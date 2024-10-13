import { Suspense, lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const WorkspaceAnalyze = lazy(() => import('@pages/workspace/analyze'));
const WorkspaceSetting = lazy(() => import('@pages/workspace/setting'));

const WorkspaceRouter = (): RouteObject[] => {
  return [
    {
      path: '',
      element: <Navigate replace to="/workspace/:url/analyze" />,
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
