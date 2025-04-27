import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { defaultClub } from '@/app/types/club.ts';

export function PlayersCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full "
    >
      <CarouselContent className="-mt-1 h-[110px] ">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 basis-full">
            <div className="p-1">
              <Card>
                <CardContent className="flex justify-between items-center gap-4 p-4">
                  {/*img*/}
                  <img
                    src={defaultClub.logo}
                    className="w-16 h-16  bg-muted/50 shadow-lg border-none rounded-lg"
                    alt=""
                  />
                  {/*  infos*/}
                  <div className="flex-1 space-y-3 justify-self-start">
                    <p className="font-medium">L. Messi</p>
                    <p className="font-extrabold">20 M$</p>
                  </div>
                  {/*  club*/}
                  <img
                    src={defaultClub.logo}
                    className="w-5 h-5 bg-grey-600 rounded-lg"
                    alt=""
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
