import { FC, ReactNode } from 'react';
import { useAuth } from '@/app/redux/slices/auth.slice.ts';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const OpenRoute: FC<Props> = ({ children }) => {
  const { authenticated } = useAuth();
  return authenticated ? <Navigate to="/dashboard" /> : children;
};
