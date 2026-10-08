import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { WorkoutExerciseSet } from "./workoutSlice";

type WorkoutRootState = Pick<RootState, "workout">;

const selectSets = (state: WorkoutRootState) => state.workout.sets;

export const selectSetsForExercise = createSelector(
  [selectSets, (_: WorkoutRootState, exerciseId: string) => exerciseId],
  (s, exerciseId): WorkoutExerciseSet[] | undefined => s[exerciseId],
);

export const selectWorkout = createSelector(
  [
    (state: WorkoutRootState) => state.workout.workouts,
    (_: WorkoutRootState, workoutId: string | undefined) => workoutId,
  ],
  (workouts, workoutId) => {
    if (!workoutId) {
      return undefined;
    }
    return workouts.find((workout) => workout.id === workoutId);
  },
);

export const selectWorkoutSummary = createSelector(
  [selectWorkout, selectSets],
  (workout, sets) =>
    workout?.exercises.map((exercise) => {
      return { exercise, sets: sets[exercise.id] };
    }),
);

export const selectParentWorkoutSummary = createSelector(
  [selectWorkout, selectSets],
  (workout, sets) =>
    workout?.exercises.map((exercise) => {
      return { exercise, sets: sets[exercise.id] };
    }),
);
