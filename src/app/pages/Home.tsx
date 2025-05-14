import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';

export default function Example() {
  const navigate = useNavigate()
  return (
    <div className={' w-full h-[100vh]  flex items-center justify-center'}>
      <Button
        onClick={() => navigate('/auth')}
      >
        Commencer
      </Button>
    </div>
  );
}
