import { createBrowserRouter } from 'react-router-dom';
import SignupPage from '@/app/auth/Signup.tsx';
import AuthLayout from '@/app/auth/AuthLayout.tsx';
import { SigninPage } from '@/app/auth/Signin.tsx';

import DasboardLayout from '@/app/dashboard/DasboardLayout.tsx';
import { OpenRoute } from './auth/OpenRoute';
import { PrivateRoute } from '@/app/auth/PrivateRoute.tsx';
import { ActiveAccountPage } from './auth/ActiveAccount';
import Home from './pages/Home';
import DashboardIndex from '@/app/dashboard/index/dashboard-index.tsx';
import DashboardClub from '@/app/dashboard/club/dashboard-club.tsx';
import { PlayersDisplay } from '@/app/dashboard/players/PlayersDisplay.tsx';
import { Marketplace } from '@/app/dashboard/market/Marketplace.tsx';

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
        <DasboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: '/dashboard/club',
        element: <DashboardClub />,
      },
      {
        path: '/dashboard/players',
        element: <PlayersDisplay />,
      },
      {
        path: '/dashboard/market',
        element: <Marketplace />,
      },
    ],
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
