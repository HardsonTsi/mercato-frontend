import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';
import { useToast } from '@/components/hooks/use-toast.ts';
import { ToastAction } from '@/components/ui/toast.tsx';
import { useAuth } from '@/app/redux/slices/auth.slice.ts';

export const useMqtt = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
      clientId: new Date().toString(),
    });

    client.on('connect', () => {
      console.log('Connecté à Mqtt');
      client.subscribe('sell');
    });

    client.on('message', (topic: string, message: any) => {
      console.log(`${topic} - : ${message.toString()}`);

      const payload = JSON.parse(message.toString());

      switch (topic) {
        case 'sell':
          if (payload.seller === user.club.id) {
            console.log('Doit afficher');
            toast({
              title: 'Nouvelle vente',
              description: payload.message,
              action: <ToastAction
                onClick={() => navigate('/dashboard/players')}
                altText="Allez voir"
              >Voir le joueur</ToastAction>,
            });
          } else {
            console.log('Pas besoin');
          }
          break;
        case 'newPlayer':
          if (payload.seller !== user.club.id) {
            console.log('Doit afficher');
            toast({
              title: 'Nouveau joueur publié',
              description: payload.message,
            });
          } else {
            console.log('Pas besoin');
          }
          break;
      }
    });

    return () => {
      client.end();
    };
  }, []);
};
