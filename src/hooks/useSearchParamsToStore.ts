import { useEffect } from "react";
import { SearchState } from "@/stores/searchStore";
import { useSearchParams } from "next/navigation";

export function useSearchParamsToStore(searchStore: SearchState) {
  const searchParams = useSearchParams();

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
}
