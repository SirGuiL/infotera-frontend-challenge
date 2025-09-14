import { HotelCard } from "@/components/search/HotelCard";
import { HotelCardsSkeleton } from "@/components/search/HotelCardsSkeleton";
import { NoHotelFound } from "@/components/search/NoHotelFound";
import { HotelCardsError } from "@/components/search/HotelCardsError";

import { HotelResponseDTO } from "@/dto/HotelResponseDTO";

interface HotelCardsProps {
  isLoading: boolean;
  error: Error | null;
  data: HotelResponseDTO[] | undefined;
}

export function HotelCards({ isLoading, error, data }: HotelCardsProps) {
  if (isLoading) {
    return <HotelCardsSkeleton />;
  }

  if (error) {
    return <HotelCardsError />;
  }

  if (!data || data?.length === 0) {
    return <NoHotelFound />;
  }

  return (
    <div className="grid grid-flow-row auto-rows-max md:grid-cols-[repeat(auto-fill,_397px)] gap-y-[53px] gap-x-8 md:justify-between">
      {data?.map(({ hotel, lowestPrice, id }) => (
        <HotelCard
          key={id}
          image={hotel.image}
          id={id}
          price={lowestPrice.amount}
          currency={lowestPrice.currency}
          name={hotel.name}
          rating={hotel.stars}
        />
      ))}
    </div>
  );
}
