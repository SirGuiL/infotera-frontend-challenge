import { AnimatePresence } from "motion/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SortField, useFilterStore } from "@/store/filterStore";
import { OrderMenuItem } from "./OrderMenuItem";
import { useDebounce } from "@/hooks/useDebounce";

interface OrderMenuProps {
  handleCloseOrderMenu: () => void;
  handleRefetch: () => void;
}

export function OrderMenu({
  handleCloseOrderMenu,
  handleRefetch,
}: OrderMenuProps) {
  const filterStore = useFilterStore();

  const ref = useClickOutside(handleCloseOrderMenu);
  const { debounced } = useDebounce(handleRefetch, 100);

  function handleSort(field: SortField) {
    if (filterStore.sortBy?.field === field) {
      filterStore.setSortBy({
        field: field,
        direction: filterStore.sortBy.direction === "asc" ? "desc" : "asc",
      });
      debounced();
      return;
    }

    filterStore.setSortBy({
      field: field,
      direction: field === "price" ? "asc" : "desc",
    });
    debounced();
  }

  return (
    <div
      className="bg-white flex flex-col gap-[5px] w-58.5 rounded-lg overflow-hidden inset-shadow-menu py-3.5 px-4"
      ref={ref}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-base leading-6 text-gray-800">
          Ordenação
        </span>
      </div>

      <AnimatePresence initial={false}>
        <OrderMenuItem
          label="Avaliação"
          arrowDirection={filterStore.sortBy?.direction}
          showArrow={filterStore.sortBy?.field === "rating"}
          key={"rating"}
          onClick={() => handleSort("rating")}
        />

        <OrderMenuItem
          label="Preço"
          arrowDirection={filterStore.sortBy?.direction}
          showArrow={filterStore.sortBy?.field === "price"}
          key={"price"}
          onClick={() => handleSort("price")}
        />

        <OrderMenuItem
          label="Nome"
          arrowDirection={filterStore.sortBy?.direction}
          showArrow={filterStore.sortBy?.field === "name"}
          key={"name"}
          onClick={() => handleSort("name")}
        />
      </AnimatePresence>
    </div>
  );
}
