import { describe, expect, test } from "@jest/globals";
import {
  calculateDuration,
  formatDate,
  formatDuration,
  getMonthName,
} from "./dateFormatter";

describe(calculateDuration.name, () => {
  test("it should format a positive duration using the elapsed seconds calculation", () => {
    const range = DateRangeBuilder()
      .withStartDate("2026-09-14T17:00:00.000Z")
      .withEndDate("2026-09-14T17:02:10.000Z")
      .build();

    expect(calculateDuration(range.startDate, range.endDate)).toEqual({
      seconds: 10,
      minutes: 2,
      hours: 0,
    });
  });

  test("it should display only seconds when the duration is under one minute", () => {
    const range = DateRangeBuilder()
      .withStartDate("2026-09-14T17:00:00.000Z")
      .withEndDate("2026-09-14T17:00:05.032Z")
      .build();

    expect(calculateDuration(range.startDate, range.endDate)).toEqual({
      seconds: 5,
      minutes: 0,
      hours: 0,
    });
  });

  test("it should display convert 60 seconds to one minute", () => {
    const range = DateRangeBuilder()
      .withStartDate("2026-09-14T17:00:00.000Z")
      .withEndDate("2026-09-14T17:01:00.032Z")
      .build();

    expect(calculateDuration(range.startDate, range.endDate)).toEqual({
      seconds: 0,
      minutes: 1,
      hours: 0,
    });
  });

  test("it should display all three values when the duration spans hours, minutes, and seconds", () => {
    const range = DateRangeBuilder()
      .withStartDate("2026-09-14T17:00:00.000Z")
      .withEndDate("2026-09-14T18:21:51.000Z")
      .build();

    expect(calculateDuration(range.startDate, range.endDate)).toEqual({
      seconds: 51,
      minutes: 21,
      hours: 1,
    });
  });

  test("it should throw for negative durations", () => {
    const range = DateRangeBuilder()
      .withStartDate("2026-09-14T17:02:00.000Z")
      .withEndDate("2026-09-14T17:00:00.000Z")
      .build();

    expect(() => calculateDuration(range.startDate, range.endDate)).toThrow(
      "-120 is not a positive value",
    );
  });
});

describe(formatDuration.name, () => {
  test("it should pad values to a two digit clock format", () => {
    const duration = DurationBuilder()
      .withSeconds(5)
      .withMinutes(4)
      .withHours(2)
      .build();

    expect(formatDuration(duration)).toBe("02:04:05");
  });

  test("it should keep the values in hh:mm:ss format", () => {
    const duration = DurationBuilder()
      .withSeconds(15)
      .withMinutes(12)
      .withHours(1)
      .build();

    expect(formatDuration(duration)).toBe("01:12:15");
  });

  test("it should throw an error when any duration value is negative", () => {
    expect(() =>
      formatDuration(
        DurationBuilder().withSeconds(-1).withMinutes(4).withHours(2).build(),
      ),
    ).toThrow("-1 is not a positive value");

    expect(() =>
      formatDuration(
        DurationBuilder().withSeconds(1).withMinutes(-4).withHours(2).build(),
      ),
    ).toThrow("-4 is not a positive value");

    expect(() =>
      formatDuration(
        DurationBuilder().withSeconds(1).withMinutes(4).withHours(-2).build(),
      ),
    ).toThrow("-2 is not a positive value");
  });
});

describe(getMonthName.name, () => {
  test("it should return all the month names in order", () => {
    const months = Array.from({ length: 12 }, (_, index) =>
      getMonthName(index),
    );

    expect(months).toEqual([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);
  });
  test("it should throw and error if the month is not found", () => {
    expect(() => getMonthName(13)).toThrow("Month not found");
  });
});

describe(formatDate.name, () => {
  test("it should format a date string as day month, year", () => {
    expect(formatDate("2024-03-15T00:00:00")).toBe("Mar 15, 2024");
  });

  test("it should format a date string as today, year", () => {
    const year = new Date().getFullYear();
    expect(formatDate(new Date().toISOString())).toBe(`Today, ${year}`);
  });
  test("it should format a date string as day month, year - when shouldDisplayToday is disabled", () => {
    const year = new Date().getFullYear();
    const date = new Date().getDate();
    const month = new Date().getMonth();

    expect(formatDate(new Date().toISOString(), false)).toBe(
      `${getMonthName(month)} ${date}, ${year}`,
    );
  });
});

function DateRangeBuilder() {
  const range = {
    startDate: "2026-09-14T17:00:00.000Z",
    endDate: "2026-09-14T17:00:00.000Z",
  };

  return {
    withStartDate(startDate: string) {
      range.startDate = startDate;
      return this;
    },
    withEndDate(endDate: string) {
      range.endDate = endDate;
      return this;
    },
    build() {
      return { ...range };
    },
  };
}

interface Duration {
  seconds: number;
  minutes: number;
  hours: number;
}
function DurationBuilder() {
  const duration: Duration = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };

  return {
    withSeconds(seconds: number) {
      duration.seconds = seconds;
      return this;
    },
    withMinutes(minutes: number) {
      duration.minutes = minutes;
      return this;
    },
    withHours(hours: number) {
      duration.hours = hours;
      return this;
    },
    build() {
      return { ...duration };
    },
  };
}
