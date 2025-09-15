import { Skeleton } from "@/components/ui/Skeleton";
import { useSearchStore } from "@/stores/searchStore";

interface DestinationContainerProps {
  isLoading: boolean;
  hotelsLength: number;
}

export function DestinationContainer({
  isLoading,
  hotelsLength,
}: DestinationContainerProps) {
  const searchStore = useSearchStore();

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <Skeleton className="h-[1.625rem] w-40 bg-gray-300" />
        <Skeleton className="h-[1.625rem] w-36 bg-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span className="font-bold text-xl leading-[1.625rem] h-[1.625rem] text-default-text">
        {searchStore.destination},
        <small className="font-normal"> {searchStore.region} </small>
      </span>

      <span className="text-caption text-xs leading-[1.625rem]">
        {hotelsLength} hoteis encontrados
      </span>
    </div>
  );
}
