import { SectionCards } from '@/components/section-cards.tsx';
import { ChartAreaInteractive } from '@/components/chart-area-interactive.tsx';

export default function DashboardIndex() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
            <SectionCards />
            <div className="px-4 lg:px-6 gap-4 auto-rows-min grid grid-cols-1 lg:grid-cols-3">
              <div className="md:col-span-2">
                <ChartAreaInteractive />
              </div>
              {/*  liste des joueurs en vente*/}
              <div className="md:col-span-1">Liste des joueurs</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
