import { ActiveAccountComponent } from '@/components/ActiveAccountComponent.tsx';
import { useLocation } from 'react-router-dom';

export function ActiveAccountPage() {


  const location = useLocation();

  const { email } = location.state || '';

  return (
    <>
      <ActiveAccountComponent email={email} />
    </>
  );
}
