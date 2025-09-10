import { HotelCards } from "@/components/search/HotelCards";
import { SearchEngine } from "@/components/ui/SearchEngine";

export default function SearchPage() {
  return (
    <div className="flex-1 flex gap-16 flex-col h-full py-6.5">
      <SearchEngine />
      <HotelCards />
    </div>
  );
}
