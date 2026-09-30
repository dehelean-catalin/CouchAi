import { describe, expect, test } from "@jest/globals";
import reducer, {
  addSetToWorkoutExercise,
  completeWorkout,
  compleateWorkoutSet,
  deleteWorkoutSet,
  editWorkoutSet,
  updateWorkoutDetails,
} from "./workoutSlice";
import { SetBuilder, WorkoutBuilder } from "./workoutMocks";

describe(completeWorkout.name, () => {
  test("it should mark the matching workout as completed and set the end date", () => {
    const endDate = "2026-09-14T18:00:00.000Z";
    const state = reducer(
      {
        workouts: [
          WorkoutBuilder().build(),
          WorkoutBuilder()
            .withId("workout-2")
            .withPlanId("plan-2")
            .withName("Leg Day")
            .withStartDate("2026-09-14T16:00:00.000Z")
            .build(),
        ],
        sets: {},
      },
      completeWorkout({ workoutId: "workout-1", endDate }),
    );

    expect(state.workouts[0]).toMatchObject({
      id: "workout-1",
      status: "completed",
      endDate,
    });
    expect(state.workouts[1]).toMatchObject({
      id: "workout-2",
      status: "in-progress",
      endDate: "",
    });
  });

  test("it should keep the workouts unchanged when the workout id does not exist", () => {
    const endDate = "2026-09-14T18:00:00.000Z";
    const initialState = {
      workouts: [WorkoutBuilder().build()],
      sets: {},
    };

    const state = reducer(
      initialState,
      completeWorkout({ workoutId: "missing-workout", endDate }),
    );

    expect(state).toEqual(initialState);
  });
});

describe(updateWorkoutDetails.name, () => {
  test("it should update only the matching workout name and dates", () => {
    const state = reducer(
      {
        workouts: [
          WorkoutBuilder().build(),
          WorkoutBuilder()
            .withId("workout-2")
            .withName("Leg Day")
            .build(),
        ],
        sets: {},
      },
      updateWorkoutDetails({
        workoutId: "workout-1",
        newWorkoutName: "Updated workout",
        newWorkoutStartDate: "2026-09-15T17:00:00.000Z",
        newWorkoutEndDate: "2026-09-15T17:10:00.000Z",
      }),
    );

    expect(state.workouts[0]).toMatchObject({
      name: "Updated workout",
      startDate: "2026-09-15T17:00:00.000Z",
      endDate: "2026-09-15T17:10:00.000Z",
    });
    expect(state.workouts[1]).toMatchObject({
      name: "Leg Day",
      startDate: "2026-09-14T17:00:00.000Z",
      endDate: "",
    });
  });

  test.each(["", "   "])(
    "it should preserve the existing name when the new name is blank (%j)",
    (newWorkoutName) => {
      const state = reducer(
        { workouts: [WorkoutBuilder().build()], sets: {} },
        updateWorkoutDetails({
          workoutId: "workout-1",
          newWorkoutName,
          newWorkoutStartDate: "2026-09-15T17:00:00.000Z",
          newWorkoutEndDate: "2026-09-15T17:10:00.000Z",
        }),
      );

      expect(state.workouts[0]).toMatchObject({
        name: "Push Day",
        startDate: "2026-09-15T17:00:00.000Z",
        endDate: "2026-09-15T17:10:00.000Z",
      });
    },
  );

  test("it should keep the workouts unchanged when the workout id does not exist", () => {
    const initialState = {
      workouts: [WorkoutBuilder().build()],
      sets: {},
    };

    const state = reducer(
      initialState,
      updateWorkoutDetails({
        workoutId: "missing-workout",
        newWorkoutName: "Updated workout",
        newWorkoutStartDate: "2026-09-15T17:00:00.000Z",
        newWorkoutEndDate: "2026-09-15T17:10:00.000Z",
      }),
    );

    expect(state).toEqual(initialState);
  });

  test("it should reject a start date later than the end date", () => {
    expect(() =>
      reducer(
        { workouts: [WorkoutBuilder().build()], sets: {} },
        updateWorkoutDetails({
          workoutId: "workout-1",
          newWorkoutName: "Updated workout",
          newWorkoutStartDate: "2026-09-15T17:10:00.000Z",
          newWorkoutEndDate: "2026-09-15T17:00:00.000Z",
        }),
      ),
    ).toThrow("Invalid Date");
  });

  test("it should allow equal start and end dates", () => {
    const date = "2026-09-15T17:00:00.000Z";
    const state = reducer(
      { workouts: [WorkoutBuilder().build()], sets: {} },
      updateWorkoutDetails({
        workoutId: "workout-1",
        newWorkoutName: "Updated workout",
        newWorkoutStartDate: date,
        newWorkoutEndDate: date,
      }),
    );

    expect(state.workouts[0]).toMatchObject({
      name: "Updated workout",
      startDate: date,
      endDate: date,
    });
  });
});

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

describe(deleteWorkoutSet.name, () => {
  test("it should remove the matching set from the list", () => {
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
      deleteWorkoutSet({
        exerciseId,
        setId: firstSet.id,
      }),
    );

    expect(state.sets[exerciseId]).toHaveLength(1);
    expect(state.sets[exerciseId]).toEqual([secondSet]);
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
      deleteWorkoutSet({
        exerciseId,
        setId: "missing-set",
      }),
    );

    expect(state.sets[exerciseId]).toEqual(initialState.sets[exerciseId]);
  });
});
