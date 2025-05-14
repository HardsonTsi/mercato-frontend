import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel.tsx';
import { PlayerType } from '@/app/types/player.ts';
import { formatCurrency, getCountryByCode } from '@/lib/utils.ts';
import { Shield } from 'lucide-react';

export function PlayersInMarket({ players }: { players: PlayerType[] }) {
  return (
    <>
      <div className=" m-1">
        <Carousel>
          <CarouselContent className="-ml-4 gap-4">
            {
              players.map(
                (player: PlayerType, index: number) => (
                  <CarouselItem
                    key={index}
                    className="p-4 basis-full md:basis-1/2 lg:basis-1/3 rounded-xl bg-muted"
                  >
                    <div className="flex items-center gap-6">
                      {/*img*/}
                      {
                        player.avatar
                          ?
                          <img src={player.avatar}
                               className={'rounded-full w-28'}
                               alt={`${player.lastname} ${player.firstname}`} />
                          :
                          <Shield width={23} />
                      }

                      {/*left*/}
                      <div className="flex justify-between  w-full">
                        <div className="space-y-3">
                          <h3 className="text-lg font-bold tracking-tight text-indigo-600">
                            {`${player.lastname} ${player.firstname}`}
                          </h3>
                          <p className="text-sm/6 font-semibold ">
                            {player.position}
                          </p>
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

                  </CarouselItem>
                ),
              )
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
