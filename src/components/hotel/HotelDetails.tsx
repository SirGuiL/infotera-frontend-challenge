"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { HotelDetailsSkeleton } from "@/components/hotel/HotelDetailsSkeleton";
import { HotelInfo } from "@/components/hotel/HotelInfo";
import { HotelRooms } from "@/components/hotel/HotelRooms";

import { Room } from "@/dto/HotelResponseDTO";
import { useBookingStore } from "@/stores/bookingStore";
import { getHotel } from "@/services/hotelService";

interface HotelDetailsProps {
  id: string;
}

export function HotelDetails({ id }: HotelDetailsProps) {
  const bookingStore = useBookingStore();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => getHotel(id),
  });

  async function handleBookRoom(room: Room) {
    bookingStore.setSelectedRoom(room);
    bookingStore.setSelectedHotel(data);
    router.push("/checkout");
  }

  if (isLoading) {
    return <HotelDetailsSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-[41.49px] pt-4 pl-4 pb-[19px] pr-4 md:pr-[25px] bg-white rounded-[14px]">
      <HotelInfo
        address={data.hotel.address}
        description={data.hotel.description}
        image={data.hotel.image}
        name={data.hotel.name}
        stars={data.hotel.stars}
      />

      <HotelRooms rooms={data.rooms} handleBookRoom={handleBookRoom} />
    </div>
  );
}
