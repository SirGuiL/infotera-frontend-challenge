import { HotelCard } from "@/components/search/HotelCard";
import { HotelResponseDTO } from "@/dto/HotelResponseDTO";
import { HotelCardsSkeleton } from "@/components/search/HotelCardsSkeleton";

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
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className="grid grid-flow-row auto-rows-max gap-y-[53px] gap-x-8"
      style={{
        gridTemplateColumns: "repeat(auto-fill, 397px)",
        justifyContent: "space-between",
      }}
    >
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
