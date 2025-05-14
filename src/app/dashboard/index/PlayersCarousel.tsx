import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { defaultClub } from '@/app/types/club.ts';
import { useGetMarketplaceQuery } from '@/app/redux/api/playerApi.ts';
import { formatCurrency } from '@/lib/utils.ts';
import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import { Shield } from 'lucide-react';

export function PlayersCarousel() {
  const { data: players, refetch } = useGetMarketplaceQuery();
  return (

    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full "
    >
      <CarouselContent className="-mt-1 h-[110px] ">
        {players?.data.map((_, index) => (
          <CarouselItem key={index}
                        className="pt-1 basis-full">
            <div className="p-1">
              <Card>
                <CardContent className="flex justify-between items-center gap-4 p-4">
                  {/*img*/}
                  {_.avatar ? (
                    <Avatar>
                      <AvatarImage src={_.avatar} />
                    </Avatar>
                  ) : (
                    <Shield width={100} />
                  )
                  }
                  {/*  infos*/}
                  <div className="flex-1 space-y-3 justify-self-start">
                    <p className="font-medium">{`${_.lastname} ${_.firstname}`}</p>
                    <p className="font-extrabold">{formatCurrency(_.price)}</p>
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
