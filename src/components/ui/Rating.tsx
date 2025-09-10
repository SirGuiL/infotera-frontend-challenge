import { StarIcon } from "@/components/icons/Star";

interface RatingProps {
  stars: number;
}

export function Rating({ stars }: RatingProps) {
  return (
    <div className="flex gap-[6.74px]">
      {Array.from({ length: stars }).map((_, index) => (
        <div className="w-4 h-4" key={index}>
          <StarIcon />
        </div>
      ))}
    </div>
  );
}
