import { describe, expect, test } from "@jest/globals";
import { SetBuilder } from "@/redux/workoutMocks";
import {
  calculateDeltaForSets,
  calculateDeltaForWeight,
  calculateWorkoutVolume,
} from "./workoutFormatter";

describe(calculateWorkoutVolume.name, () => {
  test("it should calculate completed sets", () => {
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
            .setId("set-1")
            .withWeight(10)
            .withReps(5)
            .isCompleted(false)
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
          SetBuilder()
            .setId("set-4")
            .withWeight(0)
            .withReps(8)
            .isCompleted(false)
            .build(),
        ],
      },
    ];

    expect(calculateWorkoutVolume(workouts)).toEqual({
      totalWeight: 10 * 5 + 20 * 8,
      totalSets: 4,
    });
  });

  test("it should return zero weight for workouts with no valid sets", () => {
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

    expect(calculateWorkoutVolume(workouts)).toEqual({
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

    expect(calculateWorkoutVolume(workouts)).toEqual({
      totalWeight: 0,
      totalSets: 0,
    });
  });
});

describe(calculateDeltaForSets.name, () => {
  test("it should delta between workout sets count and parent sets", () => {
    expect(calculateDeltaForSets(10, null)).toBe(0);
    expect(calculateDeltaForSets(10, 0)).toBe(10);
    expect(calculateDeltaForSets(0, 10)).toBe(-10);
    expect(calculateDeltaForSets(10, 3)).toBe(7);
    expect(calculateDeltaForSets(2, 6)).toBe(-4);
  });
});

describe(calculateDeltaForWeight.name, () => {
  test("it should return zero when weight or parent weight are zero or null", () => {
    expect(calculateDeltaForWeight(0, 100)).toBe(0);
    expect(calculateDeltaForWeight(100, 0)).toBe(0);
    expect(calculateDeltaForWeight(0, 0)).toBe(0);
    expect(calculateDeltaForWeight(100, 100)).toBe(0);
    expect(calculateDeltaForWeight(100, null)).toBe(0);
  });

  test("it should return negative delta when parent weight is greated than workout weight", () => {
    expect(calculateDeltaForWeight(75, 100)).toBe(-25);
    expect(calculateDeltaForWeight(74.33, 100)).toBe(-25.7);
  });
  test("it should return positive delta when workout weight is greated than parent weight", () => {
    expect(calculateDeltaForWeight(125, 100)).toBe(25);
    expect(calculateDeltaForWeight(134.5, 100)).toBe(34.5);
  });
});
