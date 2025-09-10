"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { LocationIcon } from "@/components/icons/Location";
import { Rating } from "@/components/ui/Rating";
import { RoomCard } from "./RoomCard";

interface HotelDetailsProps {
  id: string;
}

type Room = {
  cancellationPolicies: {
    refundable: boolean;
  };
  price: {
    amount: number;
    currency: string;
  };
  roomType: {
    name: string;
  };
};

export function HotelDetails({ id }: HotelDetailsProps) {
  async function getHotel() {
    const res = await fetch(`http://localhost:3333/hotels/${id}`);

    return res.json();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotel,
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-[41.49px] pt-4 pl-4 pb-[19px] pr-[25px] bg-white rounded-[14px]">
      <div className="flex gap-4">
        <Image
          src={data?.hotel.image}
          alt={data?.hotel.name}
          width={447}
          height={312}
          className="rounded-[14px] max-h-[312px] max-w-[447px]"
        />

        <div>
          <h1 className="font-semibold text-default-text text-xl leading-[1.625rem]">
            {data?.hotel.name}
          </h1>

          <div className="mt-[-6px] flex items-center gap-[5.08px]">
            <div className="stroke-caption w-[12.2px] h-[13px]">
              <LocationIcon />
            </div>

            <h2 className="text-caption text-xs leading-[1.625rem]">
              {data?.hotel.address}
            </h2>
          </div>

          <div className="mt-[7px]">
            <Rating stars={data?.hotel.stars} />
          </div>

          <p
            className="text-xs leading-[1.625rem] text-caption mt-[13px]"
            dangerouslySetInnerHTML={{ __html: data?.hotel.description }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[13px]">
        <h3 className="font-semibold text-default-text text-xl leading-[1.625rem]">
          Quartos disponíveis
        </h3>

        {data?.rooms.map((room: Room) => (
          <RoomCard
            key={room.roomType.name}
            name={room.roomType.name}
            price={room.price.amount}
            currency={room.price.currency}
            refundable={room.cancellationPolicies.refundable}
          />
        ))}
      </div>
    </div>
  );
}
