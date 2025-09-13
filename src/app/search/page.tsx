"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { FilterIcon } from "@/components/icons/Filter";
import { HotelCards } from "@/components/search/HotelCards";
import { FiltersMenu } from "@/components/search/FiltersMenu";
import { Button } from "@/components/ui/Button";
import { SearchEngine } from "@/components/ui/SearchEngine";
import { Menu } from "@/components/ui/Menu";

import { HotelResponseDTO } from "@/dto/HotelResponseDTO";
import { useSearchStore } from "@/store/searchStore";
import { DestinationContainer } from "@/components/search/DestinationContainer";
import { useFilterStore } from "@/store/filterStore";

interface fetchHotelsParams {
  name: string;
  price: [number, number];
  stars: number[];
}

async function fetchHotels(params: fetchHotelsParams) {
  const url = new URL("http://localhost:3333/hotels");
  const queryParams = new URLSearchParams();

  if (params.name) queryParams.append("q", params.name);

  if (params.price[0])
    queryParams.append("lowestPrice.amount_gte", params.price[0].toString());

  if (params.price[1])
    queryParams.append("lowestPrice.amount_lte", params.price[1].toString());

  if (params.stars && params.stars.length > 0) {
    params.stars.forEach((star) =>
      queryParams.append("hotel.stars", star.toString())
    );
  }

  url.search = queryParams.toString();

  const res = await fetch(url.toString());

  return (await res.json()) as HotelResponseDTO[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchStore = useSearchStore();
  const filtersStore = useFilterStore();

  const {
    setDestination,
    setRegion,
    setCheckinDate,
    setCheckoutDate,
    setAdultGuests,
    setChildGuests,
  } = searchStore;

  useEffect(() => {
    const destination = searchParams.get("destination");
    if (destination) setDestination(destination);

    const region = searchParams.get("region");
    if (region) setRegion(region);

    const checkin = searchParams.get("checkin");
    if (checkin) setCheckinDate(new Date(checkin));

    const checkout = searchParams.get("checkout");
    if (checkout) setCheckoutDate(new Date(checkout));

    const adults = searchParams.get("adults");
    if (adults) setAdultGuests(parseInt(adults, 10));

    const children = searchParams.get("children");
    if (children) setChildGuests(parseInt(children, 10));
  }, [
    searchParams,
    setDestination,
    setRegion,
    setCheckinDate,
    setCheckoutDate,
    setAdultGuests,
    setChildGuests,
  ]);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["hotels"],
    queryFn: () =>
      fetchHotels({
        name: filtersStore.hotelName,
        price: [filtersStore.minPrice, filtersStore.maxPrice],
        stars: filtersStore.starsFilter,
      }),
  });

  return (
    <div className="flex-1 flex flex-col gap-5 h-full py-6.5">
      <SearchEngine />

      <div className="flex justify-between mt-2 relative">
        <DestinationContainer
          hotelsLength={data?.length || 0}
          isLoading={isLoading}
        />

        <div className="flex items-center">
          <Button
            className="stroke-primary w-[49px] h-9.5 flex items-center justify-center pl-0 pr-0"
            variant="secondary"
            onClick={() => setIsFilterMenuOpen(true)}
          >
            <div className="min-w-6 max-w-6 h-6">
              <FilterIcon />
            </div>
          </Button>

          <Menu
            isOpen={isFilterMenuOpen}
            side="right"
            marginRight={"-right-4.5"}
            marginTop={"top-6"}
          >
            <FiltersMenu
              handleCloseFiltersMenu={() => setIsFilterMenuOpen(false)}
              handleRefetch={() => refetch()}
            />
          </Menu>
        </div>
      </div>

      <HotelCards data={data} isLoading={isLoading} error={error} />
    </div>
  );
}
