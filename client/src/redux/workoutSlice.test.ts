import { describe, expect, test } from "@jest/globals";
import reducer, {
  addSetToWorkoutExercise,
  compleateWorkoutSet,
  editWorkoutSet,
} from "./workoutSlice";
import { SetBuilder } from "./workoutMocks";

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

describe(compleateWorkoutSet.name, () => {
  test("it should complete a matching set and update its weight and reps", () => {
    const exerciseId = "exerciseMockId";
    const firstSet = SetBuilder().setId("set-1").build();
    const secondSet = SetBuilder().setId("set-2").build();

    const state = reducer(
      {
        workouts: [],
        sets: {
          [exerciseId]: [firstSet, secondSet],
        },
      },
      compleateWorkoutSet({
        exerciseId,
        setId: firstSet.id,
        weight: 100,
        reps: 12,
      }),
    );

    expect(state.sets[exerciseId][0]).toMatchObject({
      id: firstSet.id,
      weight: 100,
      reps: 12,
      isCompleted: true,
    });
    expect(state.sets[exerciseId][1]).toMatchObject({ ...secondSet });
  });

  test("it should keep the sets unchanged when no set id matches", () => {
    const exerciseId = "exerciseMockId";
    const firstSet = SetBuilder().setId("set-1").build();
    const secondSet = SetBuilder().setId("set-2").build();

    const initialState = {
      workouts: [],
      sets: {
        [exerciseId]: [firstSet, secondSet],
      },
    };

    const state = reducer(
      initialState,
      compleateWorkoutSet({
        exerciseId,
        setId: "missing-set",
        weight: 100,
        reps: 12,
      }),
    );

    expect(state.sets[exerciseId]).toEqual(initialState.sets[exerciseId]);
  });
});

describe(editWorkoutSet.name, () => {
  test("it should reopen a completed set when its id matches", () => {
    const exerciseId = "exerciseMockId";
    const firstSet = SetBuilder().setId("set-1").isCompleted(true).build();
    const secondSet = SetBuilder().setId("set-2").isCompleted(true).build();

    const state = reducer(
      {
        workouts: [],
        sets: {
          [exerciseId]: [firstSet, secondSet],
        },
      },
      editWorkoutSet({
        exerciseId,
        setId: firstSet.id,
      }),
    );

    expect(state.sets[exerciseId][0]).toMatchObject({
      id: firstSet.id,
      isCompleted: false,
    });
    expect(state.sets[exerciseId][1]).toMatchObject({
      id: secondSet.id,
      isCompleted: true,
    });
  });

  test("it should keep the sets unchanged when no set id matches", () => {
    const exerciseId = "exerciseMockId";
    const firstSet = SetBuilder().setId("set-1").isCompleted(true).build();
    const secondSet = SetBuilder().setId("set-2").isCompleted(true).build();

    const initialState = {
      workouts: [],
      sets: {
        [exerciseId]: [firstSet, secondSet],
      },
    };

    const state = reducer(
      initialState,
      editWorkoutSet({
        exerciseId,
        setId: "missing-set",
      }),
    );

    expect(state.sets[exerciseId]).toEqual(initialState.sets[exerciseId]);
  });
});
