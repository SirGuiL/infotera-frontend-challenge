import Image from "next/image";
import { LocationIcon } from "../icons/Location";
import { Rating } from "../ui/Rating";

interface HotelInfoProps {
  image: string;
  name: string;
  address: string;
  stars: number;
  description: string;
}

export function HotelInfo({
  image,
  name,
  address,
  description,
  stars,
}: HotelInfoProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src={image}
        alt={name}
        width={447}
        height={312}
        className="rounded-[14px] w-full md:w-auto md:max-h-[312px] md:max-w-[447px]"
      />

      <div>
        <h1 className="font-semibold text-default-text text-xl leading-[1.625rem]">
          {name}
        </h1>

        <div className="mt-[-6px] flex items-center gap-[5.08px]">
          <div className="stroke-caption w-[12.2px] h-[13px]">
            <LocationIcon />
          </div>

          <h2 className="text-caption text-xs leading-[1.625rem]">{address}</h2>
        </div>

        <div className="mt-[7px]">
          <Rating stars={stars} />
        </div>

        <p
          className="text-xs leading-[1.625rem] text-caption mt-[13px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
