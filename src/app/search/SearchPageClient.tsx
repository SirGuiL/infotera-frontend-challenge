"use client";
import { useQuery } from "@tanstack/react-query";
import { HotelCards } from "@/components/search/HotelCards";
import { DestinationContainer } from "@/components/search/DestinationContainer";
import { OrderFilterButtons } from "@/components/search/OrderFilterButtons";
import { SearchEngine } from "@/components/ui/SearchEngine";
import { useSearchStore } from "@/stores/searchStore";
import { useFilterStore } from "@/stores/filterStore";
import { useSearchParamsToStore } from "@/hooks/useSearchParamsToStore";
import { fetchHotels, formatField } from "@/services/hotelService";
import { useEffect } from "react";
export function SearchPageClient() {
  const searchStore = useSearchStore();
  const filtersStore = useFilterStore();
  useSearchParamsToStore(searchStore);
  const { setQuantityOfStars } = filtersStore;
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
  useEffect(() => {
    if (data) {
      setQuantityOfStars({
        5: data.filter((hotel) => hotel.hotel.stars === 5).length,
        4: data.filter((hotel) => hotel.hotel.stars === 4).length,
        3: data.filter((hotel) => hotel.hotel.stars === 3).length,
        2: data.filter((hotel) => hotel.hotel.stars === 2).length,
        1: data.filter((hotel) => hotel.hotel.stars === 1).length,
      });
    }
  }, [data, setQuantityOfStars]);
  return (
    <div className="flex-1 flex flex-col gap-5 h-full py-6.5">
      {" "}
      <SearchEngine />{" "}
      <div className="flex justify-between mt-2 relative">
        {" "}
        <DestinationContainer
          hotelsLength={data?.length || 0}
          isLoading={isLoading || isRefetching}
        />{" "}
        <OrderFilterButtons refetch={refetch} />{" "}
      </div>{" "}
      <HotelCards
        data={data}
        isLoading={isLoading || isRefetching}
        error={error}
      />{" "}
    </div>
  );
}
