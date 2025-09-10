import { HotelDetails } from "@/components/hotel/HotelDetails";
import { SearchEngine } from "@/components/ui/SearchEngine";

interface HotelPageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { id } = await params;
  const hotelId = id;

  return (
    <div className="flex flex-col gap-6.5 py-6.5">
      <SearchEngine />

      <HotelDetails id={hotelId} />
    </div>
  );
}
