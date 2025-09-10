import { SearchEngine } from "@/components/ui/SearchEngine";

export default function Home() {
  return (
    <div className="flex-1 flex gap-16 flex-col items-center justify-center h-full">
      <p className="text-default-text font-semibold text-5xl max-w-[765px] text-center">
        Os melhores <span className="text-primary">Hoteis</span> e{" "}
        <span className="text-primary">Destinos</span> para sua viagem
      </p>

      <SearchEngine />
    </div>
  );
}
