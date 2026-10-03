import { describe, expect, test } from "@jest/globals";
import {
  formatTimestamp,
  formatDate,
  getMonthName,
  calculateTimestampInSeconds,
} from "./dateFormatter";

describe(formatTimestamp.name, () => {
  test("it should format a timestamp", () => {
    expect(formatTimestamp(130)).toEqual("00:02:10");
    expect(formatTimestamp(5)).toEqual("00:00:05");
    expect(formatTimestamp(60)).toEqual("00:01:00");
    expect(formatTimestamp(4851)).toEqual("01:20:51");
    expect(formatTimestamp(4851 + 36000)).toEqual("11:20:51");
  });

  test("it should throw for negative durations", () => {
    expect(() => formatTimestamp(-120)).toThrow("-120 is not a positive value");
  });
});

describe(calculateTimestampInSeconds.name, () => {
  test("", () => {
    const twoMinutesTimestamp = calculateTimestampInSeconds(
      "2026-09-14T17:02:00.000Z",
      "2026-09-14T17:04:00.000Z",
    );

    expect(twoMinutesTimestamp).toBe(120);
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
