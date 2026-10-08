import { describe, expect, test } from "@jest/globals";
import {
  selectParentWorkoutSummary,
  selectSetsForExercise,
  selectWorkoutSummary,
} from "./workoutSelector";
import { WorkoutExerciseSet, WorkoutState } from "./workoutSlice";
import { SetBuilder, WorkoutBuilder } from "./workoutMocks";
import { RootState } from "./store";

describe(selectSetsForExercise.name, () => {
  test("it should retrieve sets for an exercise", () => {
    const exerciseSets = [
      SetBuilder().setId("set-1").build(),
      SetBuilder().setId("set-2").build(),
      SetBuilder().setId("set-3").build(),
    ];

    const state = {
      workout: {
        workouts: [],
        sets: {
          "exercise-1": exerciseSets,
          "exercise-2": [
            SetBuilder().setId("set-4").build(),
            SetBuilder().setId("set-5").build(),
            SetBuilder().setId("set-6").build(),
          ],
        },
      },
    };
    expect(selectSetsForExercise(state, "exercise-1")).toMatchObject(
      exerciseSets,
    );
  });

  test("it should return an empty array if exercise is not found", () => {
    expect(
      selectSetsForExercise(
        {
          workout: {
            workouts: [],
            sets: {
              "exercise-1": [SetBuilder().build()],
            },
          },
        },
        "missing-exercise-id",
      ),
    ).toBeUndefined();
  });
});

describe(selectWorkoutSummary.name, () => {
  test("it should return exercise and their coresponding sets", () => {
    const expectedExercises = [
      {
        id: "id-1",
        exerciseId: "exercise-1",
        name: "Chest Press",
        thumbnailUrl: "thumbnail-2",
      },
      {
        id: "id-2",
        exerciseId: "exercise-2",
        name: "Shoulder Press",
        thumbnailUrl: "thumbnail-2",
      },
    ];
    const expectedSets: Record<string, WorkoutExerciseSet[]> = {
      "id-1": [SetBuilder().setId("set-1").build()],
      "id-2": [
        SetBuilder().setId("set-2").build(),
        SetBuilder().setId("set-3").build(),
      ],
    };
    const state = {
      workout: {
        workouts: [
          WorkoutBuilder()
            .withId("workout-1")
            .addExercise(expectedExercises[0])
            .addExercise(expectedExercises[1])
            .build(),
          WorkoutBuilder()
            .withId("workout-2")
            .addExercise({
              id: "id-3",
              exerciseId: "exercise-3",
              name: "Leg Press",
              thumbnailUrl: "thumbnail-3",
            })
            .build(),
        ],
        sets: {
          ...expectedSets,
          "id-3": [SetBuilder().setId("set-4").build()],
        },
      },
    };

    selectWorkoutSummary(state, "workout-1")?.forEach((summary, index) => {
      expect(summary.exercise).toBe(expectedExercises[index]);
      expect(summary.sets).toBe(expectedSets[summary.exercise.id]);
    });
  });

  test("it should return undefined when no summary found", () => {
    expect(
      selectWorkoutSummary(
        {
          workout: {
            workouts: [
              WorkoutBuilder()
                .withId("workout-1")
                .addExercise({
                  id: "id-1",
                  exerciseId: "exercise-1",
                  name: "Chest Press",
                  thumbnailUrl: "thumbnail-2",
                })
                .addExercise({
                  id: "id-2",
                  exerciseId: "exercise-2",
                  name: "Shoulder Press",
                  thumbnailUrl: "thumbnail-2",
                })
                .build(),
            ],
            sets: {
              "id-1": [SetBuilder().setId("set-1").build()],
              "id-2": [
                SetBuilder().setId("set-2").build(),
                SetBuilder().setId("set-3").build(),
              ],
            },
          },
        },
        "missing-workout-id",
      ),
    ).toBeUndefined();
  });
});

describe(selectParentWorkoutSummary.name, () => {
  test("it should select the workout by the parent id", () => {
    const parentWorkout: WorkoutState = {
      ...WorkoutBuilder().withId("parent-workout").build(),
      exercises: [
        {
          id: "parent-exercise",
          exerciseId: "exercise",
          name: "Bench Press",
          thumbnailUrl: "",
        },
      ],
    };
    const childWorkout: WorkoutState = {
      ...WorkoutBuilder()
        .withId("child-workout")
        .withParentId(parentWorkout.id)
        .build(),
      exercises: [
        {
          ...parentWorkout.exercises[0],
          id: "child-exercise",
        },
      ],
    };
    const parentSets = [
      SetBuilder().setId("set-1").isCompleted(true).build(),
      SetBuilder().setId("set-2").isCompleted(true).build(),
    ];
    const state = {
      workout: {
        workouts: [parentWorkout, childWorkout],
        sets: {
          "parent-exercise": parentSets,
          "child-exercise": [SetBuilder().build()],
        },
      },
    };

    expect(selectParentWorkoutSummary(state, parentWorkout.id)).toEqual([
      { exercise: parentWorkout.exercises[0], sets: parentSets },
    ]);
  });

  test("it should not select a workout when no parent id is provided", () => {
    const rootWorkout: WorkoutState = {
      ...WorkoutBuilder().build(),
    };
    const state = {
      workout: {
        workouts: [rootWorkout],
        sets: {},
      },
    } satisfies Pick<RootState, "workout">;

    expect(selectParentWorkoutSummary(state, "")).toBeUndefined();
  });
});
