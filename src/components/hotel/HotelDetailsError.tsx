import { SentimentDissatisfiedIcon } from "@/components/icons/SentimentDissatisfied";

export function HotelDetailsError() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-10">
      <div className="fill-default-text w-16 h-16">
        <SentimentDissatisfiedIcon />
      </div>

      <span className="text-default-text text-2xl font-semibold">
        Erro ao buscar hotel
      </span>

      <span className="text-caption text-sm">Por favor, tente novamente</span>
    </div>
  );
}
