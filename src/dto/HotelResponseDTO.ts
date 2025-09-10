export interface HotelResponseDTO {
  id: 76628740;
  hotel: Hotel;
  lowestPrice: Price;
  rooms: Room[];
}

type Hotel = {
  name: string;
  address: string;
  stars: number;
  image: string;
  description: string;
};

export type Room = {
  roomType: RoomType;
  price: Price;
  cancellationPolicies: CancellationPolicies;
};

type RoomType = {
  name: string;
};

type Price = {
  currency: string;
  amount: number;
};

type CancellationPolicies = {
  refundable: boolean;
};
