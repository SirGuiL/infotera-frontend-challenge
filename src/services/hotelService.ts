import { HotelResponseDTO } from "@/dto/HotelResponseDTO";
import { SortField } from "@/stores/filterStore";

interface fetchHotelsParams {
  name?: string;
  price: [number, number];
  stars?: number[];
  sort?: string;
  order?: string;
}

async function fetchHotels(params: fetchHotelsParams) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/hotels`);
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

async function getHotel(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotels/${id}`);

  return res.json();
}

export { fetchHotels, formatField, getHotel };
