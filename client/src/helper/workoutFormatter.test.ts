import { describe, expect, test } from "@jest/globals";
import { SetBuilder } from "@/redux/workoutMocks";
import { calculateWorkoutTotalSetsAndReps } from "./workoutFormatter";

describe(calculateWorkoutTotalSetsAndReps.name, () => {
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

    expect(calculateWorkoutTotalSetsAndReps(workouts)).toEqual({
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

    expect(calculateWorkoutTotalSetsAndReps(workouts)).toEqual({
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

    expect(calculateWorkoutTotalSetsAndReps(workouts)).toEqual({
      totalWeight: 0,
      totalSets: 0,
    });
  });
});
