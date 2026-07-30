"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface AssessmentDatePickerProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string | null) => void;
}

const timeSlots = [
  { time: "08:00 AM", available: true },
  { time: "08:30 AM", available: true },
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
  { time: "5:00 PM", available: true },
];

function isWeekday(date: Date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function AssessmentDatePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: AssessmentDatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = selectedDate ?? today;

  return (
    <div className="rounded-2xl border border-purple-200 bg-white/80 shadow-sm">
      <div className="flex max-sm:flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              onDateChange(newDate);
              onTimeChange(null);
            }
          }}
          className="p-2 sm:pe-5 bg-background rounded-2xl"
          disabled={[
            { before: today },
            (d) => !isWeekday(d),
          ]}
        />
        <div className="relative w-full max-sm:h-48 sm:w-40">
          <div className="absolute inset-0 border-purple-100 py-4 max-sm:border-t sm:border-s">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                <div className="flex h-5 shrink-0 items-center px-5">
                  <p className="text-sm font-medium text-purple-950">
                    {format(date, "EEEE, MMM d")}
                  </p>
                </div>
                <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                  {timeSlots.map(({ time: timeSlot, available }) => (
                    <Button
                      key={timeSlot}
                      variant={selectedTime === timeSlot ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={() => onTimeChange(timeSlot)}
                      disabled={!available}
                      type="button"
                    >
                      {timeSlot}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
