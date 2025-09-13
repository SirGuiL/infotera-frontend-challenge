import { ErrorIcon } from "@/components/icons/Error";

export function SuggestionMenuError() {
  return (
    <div className="flex flex-col gap-2 items-center py-8 w-[313px] bg-white rounded-lg overflow-hidden inset-shadow-menu">
      <div className="fill-red-custom w-8 h-8">
        <ErrorIcon />
      </div>

      <span className="font-semibold text-xs text-red-custom mx-4 text-center">
        Ocorreu um erro ao buscar as sugestões, por favor tente novamente
      </span>
    </div>
  );
}
