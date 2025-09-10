import { CheckCircleIcon } from "@/components/icons/CheckCircle";
import { XCircleIcon } from "@/components/icons/XCircle";
import { Button } from "@/components/ui/Button";

interface RoomCardProps {
  name: string;
  price: number;
  currency: string;
  refundable: boolean;
}

export function RoomCard({ name, refundable, price, currency }: RoomCardProps) {
  return (
    <div className="flex gap-10.5 items-center bg-light-gray p-[17px] pb-4 pl-[23px] pr-[15px] rounded-[14px]">
      <div className="flex flex-col flex-1 gap-[3px]">
        <span className="font-semibold text-default-text text-base leading-[1.625rem]">
          {name}
        </span>

        <div className="flex items-center gap-2">
          {refundable ? (
            <div className="stroke-primary w-3 h-3">
              <CheckCircleIcon />
            </div>
          ) : (
            <div className="stroke-red-custom w-3 h-3">
              <XCircleIcon />
            </div>
          )}

          <span className={refundable ? "text-primary" : "text-red-custom"}>
            {refundable ? "Cancelamento gratuito" : "Multa de cancelamento"}
          </span>
        </div>
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

      <Button>
        <span className="font-normal text-xs">Reservar Agora</span>
      </Button>
    </div>
  );
}
