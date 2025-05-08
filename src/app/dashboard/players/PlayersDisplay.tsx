import { DataTable } from '@/components/data-table.tsx';
import { PlayersInMarket } from '@/app/dashboard/players/components/PlayersInMarket.tsx';
import { useGetClubPlayersQuery } from '@/app/redux/api/playerApi.ts';

export const PlayersDisplay = () => {

  const {data: players, isLoading} = useGetClubPlayersQuery()
  console.log(players)

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <PlayersInMarket />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          {players ? <DataTable data={players!.data} /> : null}

        </div>
      </div>
    </>
  );
};
