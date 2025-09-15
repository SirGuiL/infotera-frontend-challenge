import { useState } from "react";

import { FilterIcon } from "@/components/icons/Filter";
import { SwapVertIcon } from "@/components/icons/SwapVert";
import { Button } from "@/components/ui/Button";
import { Menu } from "@/components/ui/Menu";
import { FiltersMenu } from "@/components/search/menus/filters/FiltersMenu";
import { OrderMenu } from "@/components/search/menus/OrderMenu";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface OrderFilterButtonsProps {
  refetch: () => void;
}

export function OrderFilterButtons({ refetch }: OrderFilterButtonsProps) {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);

  return (
    <div className="flex items-center">
      <Menu
        isOpen={isOrderMenuOpen}
        side="right"
        marginRight="-right-16"
        marginTop="top-6"
      >
        <OrderMenu
          handleCloseOrderMenu={() => setIsOrderMenuOpen(false)}
          handleRefetch={refetch}
        />
      </Menu>

      <div className="flex gap-2">
        <Button
          className="stroke-primary w-[49px] h-9.5 flex items-center justify-center pl-0 pr-0"
          variant="secondary"
          onClick={() => setIsOrderMenuOpen(true)}
        >
          <div className="min-w-6 max-w-6 h-6 fill-primary">
            <SwapVertIcon />
          </div>
        </Button>

        <Button
          className="stroke-primary w-[49px] h-9.5 flex items-center justify-center pl-0 pr-0"
          variant="secondary"
          onClick={() => setIsFilterMenuOpen(true)}
        >
          <div className="min-w-6 max-w-6 h-6">
            <FilterIcon />
          </div>
        </Button>
      </div>

      <Menu
        isOpen={isFilterMenuOpen}
        side="right"
        marginRight={isSmallScreen ? "-right-2.5" : "-right-4.5"}
        marginTop="top-6"
      >
        <FiltersMenu
          handleCloseFiltersMenu={() => setIsFilterMenuOpen(false)}
          handleRefetch={refetch}
        />
      </Menu>
    </div>
  );
}
