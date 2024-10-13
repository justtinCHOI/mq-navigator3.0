import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const WorkspaceAnalyze = lazy(() => import('@pages/workspace/analyze'));
const WorkspaceSetting = lazy(() => import('@pages/workspace/setting'));

const WorkspaceRouter = () => {
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
