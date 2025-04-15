import { createBrowserRouter } from 'react-router-dom';
import SignupPage from '@/app/auth/Signup.tsx';
import AuthLayout from '@/app/auth/AuthLayout.tsx';
import { SigninPage } from '@/app/auth/Signin.tsx';

import DasboardPage from '@/app/dashboard/page.tsx';
import { OpenRoute } from './auth/OpenRoute';
import { PrivateRoute } from '@/app/auth/PrivateRoute.tsx';
import { ActiveAccountPage } from './auth/ActiveAccount';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <OpenRoute>
        <Home />
      </OpenRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DasboardPage />
      </PrivateRoute>
    ),
    children: [],
  },
  {
    path: '/auth',
    element: (
      <OpenRoute>
        <AuthLayout />
      </OpenRoute>
    ),
    children: [
      {
        index: true,
        element: <SigninPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'active-account',
        element: <ActiveAccountPage />,
      },
    ],
  },
]);

export default router;
