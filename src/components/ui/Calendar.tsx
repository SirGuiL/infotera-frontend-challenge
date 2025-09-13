"use client";

import { useState } from "react";
import { ptBR } from "date-fns/locale";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { useClickOutside } from "@/hooks/useClickOutside";

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  handleCloseCalendar: () => void;
}

export function Calendar({
  selectedDate,
  setSelectedDate,
  handleCloseCalendar,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const ref = useClickOutside(handleCloseCalendar);

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer w-6 h-6"
        >
          {"<"}
        </button>
        <h2 className="text-sm font-semibold text-default-text">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer w-6 h-6"
        >
          {">"}
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-caption text-xs">
          {format(addDays(date, i), "EEE", { locale: ptBR }).slice(0, 3)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected = selectedDate && isSameDay(day, selectedDate);

        days.push(
          <div
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
            className={`flex items-center justify-center text-center cursor-pointer h-8 w-8 rounded-full text-xs
              ${
                !isSameMonth(day, monthStart)
                  ? "text-caption"
                  : "text-default-text"
              }
              ${isSelected ? "bg-primary text-white" : "hover:bg-blue-100"}
            `}
          >
            {format(day, "d", { locale: ptBR })}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-md" ref={ref}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
