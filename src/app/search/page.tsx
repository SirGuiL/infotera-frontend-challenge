"use client";

import { useQuery } from "@tanstack/react-query";

import { FilterIcon } from "@/components/icons/Filter";
import { HotelCards } from "@/components/search/HotelCards";
import { Button } from "@/components/ui/Button";
import { SearchEngine } from "@/components/ui/SearchEngine";
import { Skeleton } from "@/components/ui/Skeleton";

import { HotelResponseDTO } from "@/dto/HotelResponseDTO";
import { sleep } from "@/utils/sleep";

async function fetchHotels() {
  await sleep(5000);
  const res = await fetch("http://localhost:3333/hotels");

  return (await res.json()) as HotelResponseDTO[];
}

export default function SearchPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
  });

  return (
    <div className="flex-1 flex flex-col gap-5 h-full py-6.5">
      <SearchEngine />

      <div className="flex justify-between mt-2">
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-[1.625rem] h-[1.625rem] text-default-text">
            São Paulo,
            <small className="font-normal"> Brasil </small>
          </span>
          {isLoading ? (
            <Skeleton className="h-[1.625rem] w-36 bg-gray-300" />
          ) : (
            <span className="text-caption text-xs leading-[1.625rem]">
              {data?.length} hoteis encontrados
            </span>
          )}
        </div>

        <Button
          className="stroke-primary w-[49px] h-9.5 flex items-center justify-center pl-0 pr-0"
          variant="secondary"
        >
          <div className="min-w-6 max-w-6 h-6">
            <FilterIcon />
          </div>
        </Button>
      </div>

      <HotelCards data={data} isLoading={isLoading} error={error} />
    </div>
  );
}
