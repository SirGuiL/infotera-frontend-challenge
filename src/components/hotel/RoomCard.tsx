import { Button } from "@/components/ui/Button";
import { CancellationType } from "@/components/ui/CancellationType";

interface RoomCardProps {
  name: string;
  price: number;
  currency: string;
  refundable: boolean;
  onBookRoom: () => void;
}

export function RoomCard({
  name,
  refundable,
  price,
  currency,
  onBookRoom,
}: RoomCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-10.5 items-center bg-light-gray p-[17px] pb-4 pl-[23px] pr-[15px] rounded-[14px]">
      <div className="flex flex-col items-center md:items-start flex-1 gap-[3px]">
        <span className="font-semibold text-default-text text-base leading-[1.625rem]">
          {name}
        </span>

        <CancellationType refundable={refundable} />
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-primary text-xl leading-[1.625rem]">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
          <small className="text-xs font-normal">/ noite</small>{" "}
        </span>

        <span className="-mt-1 text-caption text-xs leading-[1.625rem]">
          Pagamento no hotel
        </span>
      </div>

      <Button onClick={onBookRoom} className="w-full md:w-auto">
        <span className="font-normal text-xs">Reservar Agora</span>
      </Button>
    </div>
  );
}
