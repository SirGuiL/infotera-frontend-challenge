"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";

interface HotelCardProps {
  image: string;
  id: number;
  price: number;
  currency: string;
  name: string;
  rating: number;
}

export function HotelCard({
  id,
  image,
  name,
  price,
  currency,
  rating,
}: HotelCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white flex flex-col rounded-[14px] max-w-[397px]">
      <div className="min-w-[397px] max-w-[397px] min-h-[265px] max-h-[265px] rounded-[14px] overflow-hidden relative">
        <Image
          className="absolute top-0 left-0 rounded-[14px] z-10"
          src={image}
          alt={name}
          width={397}
          height={265}
        />

        <div className="absolute z-20 inset-0 bg-card-overlay shadow-[inset_0px_-68px_76px_0px_#0080FF59] rounded-[14px]"></div>

        <span className="z-30 absolute bottom-3.5 left-[11px] text-white font-semibold text-[27px] leading-[1.625rem]">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
          <small className="text-caption text-xs">/ noite</small>{" "}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 px-3 pb-[17px] pt-[19px]">
        <span className="font-semibold text-default-text text-lg leading-[1.625rem]">
          {name}
        </span>

        <div className="flex items-center justify-between">
          <Rating stars={rating} />

          <Button
            className="max-h-7"
            onClick={() => router.push(`/hotel/${id}`)}
          >
            <span>Ver mais</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
