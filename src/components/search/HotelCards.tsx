"use client";

import { useQuery } from "@tanstack/react-query";

import { HotelCard } from "./HotelCard";

type fetchHotelsResponse = {
  id: number;
  lowestPrice: {
    amount: number;
    currency: string;
  };
  hotel: {
    name: string;
    image: string;
    stars: number;
  };
};

async function fetchHotels() {
  const res = await fetch("http://localhost:3333/hotels");

  return res.json();
}

export function HotelCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
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
      {data.map(({ hotel, lowestPrice, id }: fetchHotelsResponse) => (
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
