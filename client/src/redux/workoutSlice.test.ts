import { describe, expect, test } from "@jest/globals";
import reducer, { addSetToWorkoutExercise } from "./workoutSlice";

describe(addSetToWorkoutExercise.name, () => {
  test("it should add a new working set to an empty exercise set list", () => {
    const exerciseId = "exerciseMockId";
    const state = reducer(
      { workouts: [], sets: { [exerciseId]: [] } },
      addSetToWorkoutExercise({ exerciseId }),
    );

    expect(state.sets[exerciseId]).toHaveLength(1);
    expect(state.sets[exerciseId][0].reps).toBe(0);
    expect(state.sets[exerciseId][0].weight).toBe(0);
    expect(state.sets[exerciseId][0].isCompleted).toBe(false);
  });

  test("it should append a new working set to an existing exercise set list", () => {
    const exerciseId = "exerciseMockId";
    const state = reducer(
      {
        workouts: [],
        sets: {
          [exerciseId]: [
            { id: "exerciseMockId2", weight: 0, reps: 0, isCompleted: false },
          ],
        },
      },
      addSetToWorkoutExercise({ exerciseId }),
    );

    expect(state.sets[exerciseId]).toHaveLength(2);
    expect(state.sets[exerciseId][1].reps).toBe(0);
    expect(state.sets[exerciseId][1].weight).toBe(0);
    expect(state.sets[exerciseId][1].isCompleted).toBe(false);
  });
});
