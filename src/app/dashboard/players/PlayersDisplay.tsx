import { DataTable } from '@/components/data-table.tsx';
import { PlayersInMarket } from '@/app/dashboard/players/components/PlayersInMarket.tsx';
import { useGetClubPlayersQuery } from '@/app/redux/api/playerApi.ts';
import { Loading } from '@/components/Loader.tsx';

export const PlayersDisplay = () => {

  const { data: players, isLoading } = useGetClubPlayersQuery();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] justify-center items-center flex-1 rounded-xl bg-muted/50 md:min-h-min">

        {
          isLoading
            ?
            <Loading loading={isLoading} />
            :
            <>
              <PlayersInMarket players={players!.data.filter(player => player.available)} />
                <DataTable
                  data={[...players!.data]}
                  key={JSON.stringify(players?.data)}
                />
            </>
        }
        </div>

      </div>
    </>
  );
};
