import { FC, ReactNode } from 'react';
import { useAuth } from '@/app/redux/slices/auth.slice.ts';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const { authenticated } = useAuth();
  return authenticated ? children : <Navigate to="/auth" />;
};
