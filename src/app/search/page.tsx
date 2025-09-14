"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { SwapVertIcon } from "@/components/icons/SwapVert";
import { FilterIcon } from "@/components/icons/Filter";
import { HotelCards } from "@/components/search/HotelCards";
import { FiltersMenu } from "@/components/search/FiltersMenu";
import { OrderMenu } from "@/components/search/OrderMenu";
import { DestinationContainer } from "@/components/search/DestinationContainer";
import { Button } from "@/components/ui/Button";
import { SearchEngine } from "@/components/ui/SearchEngine";
import { Menu } from "@/components/ui/Menu";

import { HotelResponseDTO } from "@/dto/HotelResponseDTO";
import { useSearchStore } from "@/store/searchStore";
import { SortField, useFilterStore } from "@/store/filterStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface fetchHotelsParams {
  name?: string;
  price: [number, number];
  stars?: number[];
  sort?: string;
  order?: string;
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

  if (params.sort) queryParams.append("_sort", params.sort);
  if (params.order) queryParams.append("_order", params.order);

  url.search = queryParams.toString();

  const res = await fetch(url.toString());

  return (await res.json()) as HotelResponseDTO[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchStore = useSearchStore();
  const filtersStore = useFilterStore();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);

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

  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: ["hotels"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchHotels({
        name: filtersStore.hotelName,
        price: [filtersStore.minPrice, filtersStore.maxPrice],
        stars: filtersStore.starsFilter,
        order: filtersStore.sortBy?.direction,
        sort: formatField(filtersStore.sortBy?.field),
      }),
  });

  function formatField(field: SortField | undefined) {
    if (!field) return undefined;

    switch (field) {
      case "price":
        return "lowestPrice.amount";
      case "rating":
        return "hotel.stars";
      case "name":
        return "hotel.name";
      default:
        return field;
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-5 h-full py-6.5">
      <SearchEngine />

      <div className="flex justify-between mt-2 relative">
        <DestinationContainer
          hotelsLength={data?.length || 0}
          isLoading={isLoading || isRefetching}
        />

        <div className="flex items-center">
          <Menu
            isOpen={isOrderMenuOpen}
            side="right"
            marginRight="-right-16"
            marginTop="top-6"
          >
            <OrderMenu
              handleCloseOrderMenu={() => setIsOrderMenuOpen(false)}
              handleRefetch={refetch}
            />
          </Menu>

          <div className="flex gap-2">
            <Button
              className="stroke-primary w-[49px] h-9.5 flex items-center justify-center pl-0 pr-0"
              variant="secondary"
              onClick={() => setIsOrderMenuOpen(true)}
            >
              <div className="min-w-6 max-w-6 h-6 fill-primary">
                <SwapVertIcon />
              </div>
            </Button>

            <Button
              className="stroke-primary w-[49px] h-9.5 flex items-center justify-center pl-0 pr-0"
              variant="secondary"
              onClick={() => setIsFilterMenuOpen(true)}
            >
              <div className="min-w-6 max-w-6 h-6">
                <FilterIcon />
              </div>
            </Button>
          </div>

          <Menu
            isOpen={isFilterMenuOpen}
            side="right"
            marginRight={isSmallScreen ? "-right-2.5" : "-right-4.5"}
            marginTop="top-6"
          >
            <FiltersMenu
              handleCloseFiltersMenu={() => setIsFilterMenuOpen(false)}
              handleRefetch={refetch}
            />
          </Menu>
        </div>
      </div>

      <HotelCards
        data={data}
        isLoading={isLoading || isRefetching}
        error={error}
      />
    </div>
  );
}
