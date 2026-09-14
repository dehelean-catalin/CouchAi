import { describe, expect, test } from "@jest/globals";
import { SetBuilder } from "@/redux/workoutMocks";
import {
  calculateWorkoutStats,
  calculateWorkoutDuration,
  formatDuration,
} from "./workoutSummary.bussiness";

describe(calculateWorkoutStats.name, () => {
  test("it should sum only valid set totals and count all sets", () => {
    const workouts = [
      {
        sets: [
          SetBuilder()
            .setId("set-1")
            .withWeight(10)
            .withReps(5)
            .isCompleted(true)
            .build(),
          SetBuilder()
            .setId("set-2")
            .withWeight(0)
            .withReps(5)
            .isCompleted(true)
            .build(),
          SetBuilder()
            .setId("set-3")
            .withWeight(15)
            .withReps(0)
            .isCompleted(true)
            .build(),
        ],
      },
      {
        sets: [
          SetBuilder()
            .setId("set-4")
            .withWeight(20)
            .withReps(8)
            .isCompleted(true)
            .build(),
        ],
      },
    ];

    expect(calculateWorkoutStats(workouts)).toEqual({
      totalWeight: 10 * 5 + 20 * 8,
      totalSets: 4,
    });
  });

  test("it should return zero totals for workouts with no valid sets", () => {
    const workouts = [
      {
        sets: [
          SetBuilder()
            .setId("set-1")
            .withWeight(0)
            .withReps(5)
            .isCompleted(true)
            .build(),
          SetBuilder()
            .setId("set-2")
            .withWeight(10)
            .withReps(0)
            .isCompleted(true)
            .build(),
        ],
      },
    ];

    expect(calculateWorkoutStats(workouts)).toEqual({
      totalWeight: 0,
      totalSets: 2,
    });
  });

  test("it should return zero when sets is empty", () => {
    const workouts = [
      {
        sets: [],
      },
      {
        sets: [],
      },
    ];

    expect(calculateWorkoutStats(workouts)).toEqual({
      totalWeight: 0,
      totalSets: 0,
    });
  });
});

describe(calculateWorkoutDuration.name, () => {
  test("it should format a positive duration using the elapsed seconds calculation", () => {
    const range = DateRangeBuilder()
      .withStartDate("2026-09-14T17:00:00.000Z")
      .withEndDate("2026-09-14T17:02:10.000Z")
      .build();

    expect(calculateWorkoutDuration(range.startDate, range.endDate)).toEqual({
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

    expect(calculateWorkoutDuration(range.startDate, range.endDate)).toEqual({
      seconds: 5,
      minutes: 0,
      hours: 0,
    });
  });

  test("it should display all three values when the duration spans hours, minutes, and seconds", () => {
    const range = DateRangeBuilder()
      .withStartDate("2026-09-14T17:00:00.000Z")
      .withEndDate("2026-09-14T18:21:51.000Z")
      .build();

    expect(calculateWorkoutDuration(range.startDate, range.endDate)).toEqual({
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

    expect(() =>
      calculateWorkoutDuration(range.startDate, range.endDate),
    ).toThrow("-120 is not a positive value");
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

type DateRange = {
  startDate: string;
  endDate: string;
};

function DateRangeBuilder() {
  const range: DateRange = {
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

type Duration = {
  seconds: number;
  minutes: number;
  hours: number;
};
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
