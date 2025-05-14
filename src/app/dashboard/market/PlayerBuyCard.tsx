import { PlayerType } from '@/app/types/player.ts';
import { Shield } from 'lucide-react';
import { formatCurrency, getCountryByCode } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { Loading } from '@/components/Loader.tsx';
import { useBuyPlayerMutation } from '@/app/redux/api/playerApi.ts';
import { useToast } from '@/components/hooks/use-toast.ts';

export const PlayerBuyCard = ({ player }: { player: PlayerType }) => {

  const [buyMutation, { isLoading }] = useBuyPlayerMutation();

  const { toast } = useToast();

  async function onBuy(id: string) {
    await buyMutation({ id })
      .unwrap()
      .then(_ => {
        toast({
          type: 'background',
          variant: 'default',
          title: 'Joueur acheté avec succès',
        });
      })
      .catch(e => {
        toast({
          type: 'background',
          variant: 'default',
          title: e.data.message,
        });
      });
  }


  return (
    <div key={JSON.stringify(player)}
         className={'p-4 basis-full md:basis-1/2 lg:basis-1/3 rounded-xl bg-muted'}>
      <div className="flex items-center  gap-6">
        {/*img*/}
        {
          player.avatar ?
            <img
              src={player.avatar}
              className={'rounded-full w-28'}
              alt={`${player.lastname} ${player.firstname}`} />
            :
            <Shield width={100}
                    height={100} />
        }

        {/*left*/}
        <div className="flex justify-between items-center  w-full">
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-tight text-indigo-600">
              {`${player.lastname} ${player.firstname}`}
            </h3>
            <p className="text-sm/6 font-semibold ">
              {player.position}
            </p>
            {
              player.club?.logo
                ?
                <img src={player.club?.logo}
                     width={28}
                     className={'rounded-full'}
                     alt={`${player.club?.name}`} />
                :
                <Shield width={32}
                        height={32} />
            }
          </div>
          {/*  right*/}
          <div className="text-center space-3-2">
            {getCountryByCode(player.country)?.flag}
            <p className=" text-lg font-semibold text-indigo-600">
              {formatCurrency(player.price)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-3">
        <Button
          onClick={() => onBuy(player.id!)}
          className="mx-auto"
        >

          {
            isLoading
              ?
              <Loading loading={isLoading} />
              :
              <span>Acheter</span>
          }
        </Button>

      </div>
    </div>


  );
};
