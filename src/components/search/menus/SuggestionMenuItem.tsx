import { HTMLAttributes } from "react";
import { LocationIcon } from "../../icons/Location";

interface SuggestionMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  region: string;
  highlight: string;
}

export function SuggestionMenuItem({
  name,
  region,
  highlight,
  ...props
}: SuggestionMenuItemProps) {
  const nameParts = name
    .trim()
    .toLocaleLowerCase()
    .split(highlight.trim().toLocaleLowerCase());

  const regionParts = region
    .trim()
    .toLocaleLowerCase()
    .split(highlight.trim().toLocaleLowerCase());

  return (
    <div
      className="flex items-center gap-2.5 py-2.5 px-[13px] cursor-pointer hover:bg-light-gray transition-colors duration-300"
      {...props}
    >
      <div>
        <div className="stroke-primary w-[13px] h-[13px]">
          <LocationIcon />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-xs leading-[1.625rem] text-default-text capitalize">
          {!highlight ||
          !name
            .trim()
            .toLocaleLowerCase()
            .includes(highlight.trim().toLocaleLowerCase()) ? (
            name
          ) : (
            <>
              {nameParts[0]}
              <span className="bg-highlight">{highlight}</span>
              {nameParts[1]}
            </>
          )}
        </span>

        <span className="text-caption text-[10px] leading-[1.625rem] -mt-[9px]">
          {!highlight ||
          !region
            .trim()
            .toLocaleLowerCase()
            .includes(highlight.trim().toLocaleLowerCase()) ? (
            region
          ) : (
            <>
              {regionParts[0]}
              <span className="bg-highlight">{highlight}</span>
              {regionParts[1]}
            </>
          )}
        </span>
      </div>
    </div>
  );
}
