import { useGetMarketplaceQuery } from '@/app/redux/api/playerApi.ts';
import { Loading } from '@/components/Loader';
import { PlayerType } from '@/app/types/player.ts';

import { PlayerBuyCard } from './PlayerBuyCard';

export const Marketplace = () => {

  const { data: playersList, isLoading } = useGetMarketplaceQuery();


  // @ts-ignore
  return <>
    <div className="flex flex-1  gap-4 p-4 ">
      {
        isLoading
          ?
          <Loading loading={isLoading} />
          :
          <div className="min-h-[100vh] flex gap-4  items-center flex-1 rounded-xl  md:min-h-min">

            {
              playersList!.data?.length
                ?
                playersList!.data?.map((player: PlayerType) =>

                  <>
                   <PlayerBuyCard player={player} key={player.id}/>

                  </>,
                )
                : <p className="text-center">Aucun joueur</p>
            }
          </div>
      }

    </div>

  </>;
};
