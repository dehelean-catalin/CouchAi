import { describe, expect, test } from "@jest/globals";
import reducer, {
  addSetToWorkoutExercise,
  completeWorkout,
  compleateWorkoutSet,
  deleteWorkout,
  deleteWorkoutSet,
  editWorkoutSet,
  performAgainThisWorkout,
  updateWorkoutDetails,
  startWorkout,
} from "./workoutSlice";
import { completedWorkout, SetBuilder, WorkoutBuilder } from "./workoutMocks";
import { EMPTY_WORKOUT_NAME } from "./constants";

describe(startWorkout.name, () => {
  test("it should start the workout", () => {
    const state = reducer(
      { workouts: [WorkoutBuilder().build()], sets: {} },
      startWorkout(),
    );

    const newWorkout = state.workouts[1];

    expect(newWorkout.name).not.toBe("");
    expect(newWorkout.name).toBe(EMPTY_WORKOUT_NAME);
    expect(newWorkout.status).toBe("in-progress");
    expect(newWorkout.startDate).not.toBe("");
    expect(newWorkout.endDate).toBe("");
  });
});

describe(deleteWorkout.name, () => {
  test("it should workout as deleted", () => {
    const state = reducer(
      {
        workouts: [
          WorkoutBuilder().build(),
          WorkoutBuilder().withId("workout-2").withName("Leg Day").build(),
        ],
        sets: {},
      },
      deleteWorkout("workout-1"),
    );

    expect(state.workouts[0]).toMatchObject({
      id: "workout-1",
      status: "deleted",
    });
    expect(state.workouts[1]).toMatchObject({
      id: "workout-2",
      status: "in-progress",
    });
  });

  test("it should keep the workouts unchanged when the workout id does not exist", () => {
    const initialState = {
      workouts: [WorkoutBuilder().build()],
      sets: {},
    };

    const state = reducer(initialState, deleteWorkout("missing-workout"));

    expect(state).toEqual(initialState);
  });
});

describe(completeWorkout.name, () => {
  test("it should mark the matching workout as completed and set the end date", () => {
    const endDate = "2026-09-14T18:00:00.000Z";
    const state = reducer(
      {
        workouts: [
          WorkoutBuilder().build(),
          WorkoutBuilder()
            .withId("workout-2")
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
          WorkoutBuilder().withId("workout-2").withName("Leg Day").build(),
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

  test("it should copy the previous uncompleted set and add it to the list", () => {
    const exerciseId = "exerciseMockId";
    const state = reducer(
      {
        workouts: [],
        sets: {
          [exerciseId]: [
            { id: "exerciseMockId2", weight: 20, reps: 10, isCompleted: false },
            { id: "exerciseMockId3", weight: 25, reps: 15, isCompleted: false },
          ],
        },
      },
      addSetToWorkoutExercise({ exerciseId }),
    );

    expect(state.sets[exerciseId]).toHaveLength(3);
    expect(state.sets[exerciseId][2].reps).toBe(15);
    expect(state.sets[exerciseId][2].weight).toBe(25);
    expect(state.sets[exerciseId][2].isCompleted).toBe(false);
  });

  test("it should copy the previous completed set and add it to the list", () => {
    const exerciseId = "exerciseMockId";
    const state = reducer(
      {
        workouts: [],
        sets: {
          [exerciseId]: [
            { id: "exerciseMockId2", weight: 20, reps: 10, isCompleted: false },
            { id: "exerciseMockId3", weight: 25, reps: 15, isCompleted: true },
          ],
        },
      },
      addSetToWorkoutExercise({ exerciseId }),
    );

    expect(state.sets[exerciseId]).toHaveLength(3);
    expect(state.sets[exerciseId][2].reps).toBe(15);
    expect(state.sets[exerciseId][2].weight).toBe(25);
    expect(state.sets[exerciseId][2].isCompleted).toBe(false);
  });

  test("it should not update the list when exercise is not found", () => {
    const exerciseId = "exerciseMockId";
    const state = reducer(
      {
        workouts: [],
        sets: {
          [exerciseId]: [
            { id: "exerciseMockId2", weight: 20, reps: 10, isCompleted: false },
          ],
        },
      },
      addSetToWorkoutExercise({ exerciseId: "otherExerciseId" }),
    );

    expect(state.sets[exerciseId]).toHaveLength(1);
    expect(state.sets[exerciseId][0].reps).toBe(10);
    expect(state.sets[exerciseId][0].weight).toBe(20);
    expect(state.sets[exerciseId][0].isCompleted).toBe(false);
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

describe(performAgainThisWorkout.name, () => {
  test("it should leave the state unchanged when the workout does not exist", () => {
    const initialState = {
      workouts: [WorkoutBuilder().build()],
      sets: {},
    };

    const state = reducer(
      initialState,
      performAgainThisWorkout({
        originalWorkoutId: "missing-workout",
        newWorkoutId: "workout-copy",
      }),
    );

    expect(state).toBe(initialState);
    expect(state).toEqual(initialState);
  });

  test("it should copy the workout details", () => {
    const otherWorkout = WorkoutBuilder()
      .withId("workout-2")
      .withName("Leg Day")
      .build();

    const initialState = {
      workouts: [completedWorkout, otherWorkout],
      sets: {},
    };

    const state = reducer(
      initialState,
      performAgainThisWorkout({
        originalWorkoutId: completedWorkout.id,
        newWorkoutId: "workout-copy",
      }),
    );

    const copiedWorkout = state.workouts[2];

    expect(state.workouts).toHaveLength(3);

    expect(copiedWorkout.id).toBe("workout-copy");
    expect(copiedWorkout.parentId).toBe("workout-1");
    expect(copiedWorkout.name).toBe(completedWorkout.name);
    expect(copiedWorkout.status).toBe("in-progress");
    expect(copiedWorkout.endDate).toBe("");
    expect(copiedWorkout.startDate).not.toBe(completedWorkout.startDate);
  });

  test("it should copy workout exercise details", () => {
    const originalWorkout = {
      ...completedWorkout,
      exercises: [
        {
          id: "id-1",
          exerciseId: "exercise-1",
          name: "Bench Press 1",
          thumbnailUrl: "thumbnail-url-1",
        },
        {
          id: "id-2",
          exerciseId: "exercise-2",
          name: "Bench Press 2",
          thumbnailUrl: "thumbnail-url-2",
        },
      ],
    };
    const state = reducer(
      {
        workouts: [originalWorkout],
        sets: {
          "id-1": [
            SetBuilder().withReps(10).withWeight(10).isCompleted(true).build(),
            SetBuilder().withReps(12).withWeight(12).isCompleted(true).build(),
          ],
          "id-2": [
            SetBuilder().withReps(8).withWeight(8).isCompleted(true).build(),
            SetBuilder().withReps(20).withWeight(20).isCompleted(true).build(),
          ],
        },
      },
      performAgainThisWorkout({
        originalWorkoutId: completedWorkout.id,
        newWorkoutId: "workout-copy",
      }),
    );

    const copiedWorkout = state.workouts[1];

    const copiedWorkoutSets1 = state.sets[copiedWorkout.exercises[0].id];
    const copiedWorkoutSets2 = state.sets[copiedWorkout.exercises[1].id];

    expect(state.workouts).toHaveLength(2);
    expect(copiedWorkout.exercises[0].id).not.toBe("id-1");
    expect(copiedWorkout.exercises[0].exerciseId).toBe("exercise-1");
    expect(copiedWorkout.exercises[0].name).toBe("Bench Press 1");
    expect(copiedWorkout.exercises[0].thumbnailUrl).toBe("thumbnail-url-1");
    expect(copiedWorkout.exercises[0].thumbnailUrl).toBe("thumbnail-url-1");

    expect(copiedWorkout.exercises[1].exerciseId).toBe("exercise-2");
    expect(copiedWorkout.exercises[1].exerciseId).not.toBe("id-2");
    expect(copiedWorkout.exercises[1].name).toBe("Bench Press 2");
    expect(copiedWorkout.exercises[1].thumbnailUrl).toBe("thumbnail-url-2");

    expect(copiedWorkoutSets1).toHaveLength(2);

    expect(copiedWorkoutSets1[0].id).not.toBe("set-1");
    expect(copiedWorkoutSets1[0].weight).toBe(10);
    expect(copiedWorkoutSets1[0].reps).toBe(10);
    expect(copiedWorkoutSets1[0].isCompleted).toBe(false);

    expect(copiedWorkoutSets1[1].id).not.toBe("set-1");
    expect(copiedWorkoutSets1[1].weight).toBe(12);
    expect(copiedWorkoutSets1[1].reps).toBe(12);
    expect(copiedWorkoutSets1[1].isCompleted).toBe(false);

    expect(copiedWorkoutSets2).toHaveLength(2);

    expect(copiedWorkoutSets2[0].id).not.toBe("set-1");
    expect(copiedWorkoutSets2[0].weight).toBe(8);
    expect(copiedWorkoutSets2[0].reps).toBe(8);
    expect(copiedWorkoutSets2[0].isCompleted).toBe(false);

    expect(copiedWorkoutSets2[1].id).not.toBe("set-1");
    expect(copiedWorkoutSets2[1].weight).toBe(20);
    expect(copiedWorkoutSets2[1].reps).toBe(20);
    expect(copiedWorkoutSets2[1].isCompleted).toBe(false);
  });
});
