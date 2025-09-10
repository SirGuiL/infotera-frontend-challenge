import { HotelDetails } from "@/components/hotel/HotelDetails";
import { SearchEngine } from "@/components/ui/SearchEngine";

interface HotelPageProps {
  params: {
    id: string;
  };
}

export default function HotelPage({ params }: HotelPageProps) {
  const hotelId = params.id;

  return (
    <div className="flex flex-col gap-6.5 py-6.5">
      <SearchEngine />

      <HotelDetails id={hotelId} />
    </div>
  );
}
