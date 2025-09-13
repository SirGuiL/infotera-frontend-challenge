import { SpinnerIcon } from "@/components/icons/Spinner";

export function SuggestionMenuLoading() {
  return (
    <div className="hidden md:flex flex-col w-[313px] bg-white rounded-lg overflow-hidden inset-shadow-menu">
      <div className="flex justify-center items-center py-10">
        <SpinnerIcon className="size-6 animate-spin text-white" />
      </div>
    </div>
  );
}
