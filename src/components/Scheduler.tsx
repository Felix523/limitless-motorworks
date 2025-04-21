import React from "react";
import { useState, useEffect } from "react";
import { DatePickerInput } from "@mantine/dates";
import { Select } from "@mantine/core";
import { ScheduleData } from "../types";
import { TIME_SLOTS } from "../constants/TimeSlots";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = "America/New_York";

type Booking = { datetime: string };

const Scheduler = ({ onSubmit }: ScheduleData) => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!date) {
      setAvailableTimes([]);
      return;
    }
    const selectedDateStr = dayjs(date).format("MM-DD-YYYY");
    const booked = bookedSlots[selectedDateStr] || [];
    const now = new Date();
    const filteredTimes = TIME_SLOTS.filter((slot) => {
      const slotDateTime = dayjs(`${selectedDateStr} ${slot}`);
      if (slotDateTime.isBefore(dayjs(now))) return false; // prevent past slots
      return !booked.includes(slot);
    });

    setAvailableTimes(filteredTimes);
    setTime(""); // Reset time when date changes
  }, [date, bookedSlots]);

  const handleSubmit = () => {
    if (date && time) {
      const dateTime = dayjs(
        `${dayjs(date).format("MM-DD-YYYY")} ${time}`
      ).toDate();
      onSubmit(dateTime);
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-sm">
      <DatePickerInput
        label="Select a Date"
        value={date}
        onChange={setDate}
        minDate={new Date()}
        placeholder="Pick date"
      />

      <Select
        label="Select a Time"
        value={time}
        onChange={(value) => setTime(value || "")}
        disabled={!date}
        data={availableTimes}
      />
    </div>
  );
};

export default Scheduler;
