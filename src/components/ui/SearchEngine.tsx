import { LocationIcon } from "@/components/icons/Location";
import { Button } from "@/components/ui/Button";

export function SearchEngine() {
  return (
    <div className="flex justify-between items-center w-full bg-white pl-4 pr-2.5 py-2.5 drop-shadow-search rounded-xl">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">
            Destino
          </span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem]">
          São Paulo
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">
            Entrada
          </span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem]">
          22/12/2022
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">Saída</span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem]">
          28/12/2022
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">
            Hóspedes
          </span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem]">
          2 Adultos, 1 Quarto
        </span>
      </div>

      <Button variant="primary">
        <span className="text-xs font-normal">Pesquisar</span>
      </Button>
    </div>
  );
}
