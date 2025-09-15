import { Room } from "@/dto/HotelResponseDTO";
import { RoomCard } from "./RoomCard";

interface HotelRoomsProps {
  rooms: Room[];
  handleBookRoom(room: Room): void;
}

export function HotelRooms({ handleBookRoom, rooms }: HotelRoomsProps) {
  return (
    <div className="flex flex-col gap-[13px]">
      <h3 className="font-semibold text-default-text text-xl leading-[1.625rem]">
        Quartos disponíveis
      </h3>

      {rooms.map((room: Room) => (
        <RoomCard
          key={room.roomType.name}
          name={room.roomType.name}
          price={room.price.amount}
          currency={room.price.currency}
          refundable={room.cancellationPolicies.refundable}
          onBookRoom={() => handleBookRoom(room)}
        />
      ))}
    </div>
  );
}
