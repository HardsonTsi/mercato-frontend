import data from './data.json';
import { DataTable } from '@/components/data-table.tsx';
import { PlayersInMarket } from '@/app/dashboard/players/components/PlayersInMarket.tsx';

export const PlayersDisplay = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <PlayersInMarket />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DataTable data={data} />
        </div>
      </div>
    </>
  );
};
