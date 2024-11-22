"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input"; // Adjust as per Shadcn UI setup
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

export default function SelectTime({ form, formLabel, name }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const formatDateRange = (dateRange: DateRange | undefined): string => {
    if (!dateRange?.from) return "Pick a date";
    if (dateRange.to) {
      return `${format(dateRange.from, "LLL dd, y")} -> ${format(
        dateRange.to,
        "LLL dd, y"
      )}`;
    }
    return format(dateRange.from, "LLL dd, y");
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <div className="grid gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      {...field}
                      readOnly
                      value={formatDateRange(date)} // Display formatted date range
                    />
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);

                      // Update form with formatted string
                      field.onChange(formatDateRange(newDate));
                    }}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage className="text-[0.7rem]" />
        </FormItem>
      )}
    />
  );
}
