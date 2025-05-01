import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export function PlayersInMarket() {
  return (
    <>
      <div className="p-4">
        <Carousel>
          <CarouselContent className="gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 aspect-video rounded-xl bg-muted"
              >
                <li>
                  <div className="flex items-center gap-x-6">
                    <Avatar>
                      <AvatarImage
                        className="size-16 rounded-full"
                        src="https://github.com/shadcn.png"
                      />
                    </Avatar>

                    <div>
                      <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                        Lionel Messi
                      </h3>
                      <p className="text-sm/6 font-semibold text-indigo-600">
                        Attaquant
                      </p>
                    </div>
                  </div>
                </li>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
