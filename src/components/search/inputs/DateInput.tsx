import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useSearchStore } from "@/stores/searchStore";

import { CalendarIcon } from "@/components/icons/Calendar";
import { Menu } from "@/components/ui/Menu";
import { Calendar } from "@/components/ui/Calendar";

interface DateInputProps {
  label: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  side?: "left" | "right";
}

export function DateInput({
  label,
  selectedDate,
  setSelectedDate,
  side,
}: DateInputProps) {
  const searchStore = useSearchStore();

  const [isCheckinCalendarOpen, setIsCheckinCalendarOpen] =
    useState<boolean>(false);

  return (
    <div
      className="flex flex-col flex-1 order-2 border-0 md:border-l border-default-border border-[#E3E6E9] md:pl-3.5"
      onClick={() => setIsCheckinCalendarOpen(true)}
    >
      <div className="flex items-center gap-2">
        <div className="stroke-primary w-[13px] h-3.5">
          <CalendarIcon />
        </div>

        <span className="text-caption text-xs leading-6">{label}</span>
      </div>

      <span className="text-default-text font-semibold text-xs leading-[1.625rem] -mt-0.5">
        {format(selectedDate, "dd/MM/yyyy", {
          locale: ptBR,
        })}
      </span>

      <Menu isOpen={isCheckinCalendarOpen} side={side} marginTop="top-3">
        <Calendar
          selectedDate={searchStore.checkinDate}
          setSelectedDate={setSelectedDate}
          handleCloseCalendar={() => setIsCheckinCalendarOpen(false)}
        />
      </Menu>
    </div>
  );
}
