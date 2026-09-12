import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type WorkoutStatus = "completed" | "in-progress" | "deleted" | null;

export interface WorkoutState {
  id: string;
  planId: string;
  name: string;
  status: WorkoutStatus;
  startDate: string;
  endDate: string;
  notes: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  name: string;
  thumbnailUrl: string;
}

export interface WorkoutExerciseSet {
  id: string;
  weight: number;
  reps: number;
  isCompleted: boolean;
}

const emptyWorkout: WorkoutState = {
  id: "",
  planId: "",
  name: "",
  status: null,
  notes: "",
  startDate: "",
  endDate: "",
  exercises: [],
};

type Sets = Record<string, WorkoutExerciseSet[]>;

const initialState: { workouts: WorkoutState[]; sets: Sets } = {
  workouts: [],
  sets: {},
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    startWorkout(oldState) {
      oldState.workouts.push({
        ...emptyWorkout,
        id: generateRandomId(),
        name: "Workout on the fly",
        status: "in-progress",
        startDate: new Date().toISOString(),
      });
    },
    deleteWorkout: (oldState, action: PayloadAction<string>) => {
      const workoutToUpdate = oldState.workouts.find(
        (workout) => workout.id === action.payload,
      );
      if (workoutToUpdate) {
        workoutToUpdate.status = "deleted";
      }
    },
    completeWorkout: (oldState, action: PayloadAction<string>) => {
      const workoutToUpdate = oldState.workouts.find(
        (workout) => workout.id === action.payload,
      );
      if (workoutToUpdate) {
        workoutToUpdate.status = "completed";
      }
    },
    addExerciseToWorkout: (
      oldState,
      action: PayloadAction<{
        workoutId: string;
        exercises: WorkoutExercise[];
      }>,
    ) => {
      const { workoutId, exercises } = action.payload;

      if (!exercises.length) {
        return oldState;
      }

      const workoutToUpdate = oldState.workouts.find(
        (workout) => workout.id === workoutId,
      );
      if (workoutToUpdate) {
        exercises.forEach((exercise) => {
          workoutToUpdate.exercises.push(exercise);
          oldState.sets[exercise.id] = [generateInitialWorkingExerciseSet()];
        });
      }
    },
    removeExerciseFromWorkout: (
      oldState,
      action: PayloadAction<{
        workoutId: string;
        exerciseId: string;
        exercisePosition: number;
      }>,
    ) => {
      const { workoutId, exercisePosition, exerciseId } = action.payload;

      const workoutToUpdate = oldState.workouts.find(
        (workout) => workout.id === workoutId,
      );
      if (!workoutToUpdate) {
        return oldState;
      }

      workoutToUpdate.exercises.splice(exercisePosition, 1);
      delete oldState.sets[exerciseId];
    },
    replaceExerciseFromWorkout: (
      oldState,
      action: PayloadAction<{
        workoutId: string;
        exercisePosition: number;
        exerciseId: string;
        newExercise: WorkoutExercise;
      }>,
    ) => {
      const { workoutId, exercisePosition, exerciseId, newExercise } =
        action.payload;

      const workoutToUpdate = oldState.workouts.find(
        (workout) => workout.id === workoutId,
      );
      const setsToReplace = oldState.sets[exerciseId];
      if (!workoutToUpdate || !setsToReplace) {
        return oldState;
      }

      workoutToUpdate.exercises.splice(exercisePosition, 1, newExercise);

      delete oldState.sets[exerciseId];
      oldState.sets[newExercise.id] = [];

      if (setsToReplace.length === 0) {
        oldState.sets[newExercise.id].push(generateInitialWorkingExerciseSet());
      } else {
        for (let i = 0; i < setsToReplace.length; i++) {
          oldState.sets[newExercise.id].push(
            generateInitialWorkingExerciseSet(),
          );
        }
      }
    },
    updateWorkoutDetails: (
      oldState,
      action: PayloadAction<{ workoutId: string; newWorkoutName: string }>,
    ) => {
      const workoutToUpdate = oldState.workouts.find(
        (workout) => workout.id === action.payload.workoutId,
      );
      if (!workoutToUpdate) {
        return oldState;
      }
      workoutToUpdate.name = action.payload.newWorkoutName;
    },
    addSetToWorkoutExercise: (
      oldState,
      action: PayloadAction<{ exerciseId: string }>,
    ) => {
      oldState.sets[action.payload.exerciseId].push(
        generateInitialWorkingExerciseSet(),
      );
    },
    compleateWorkoutSet(
      oldState,
      action: PayloadAction<{
        exerciseId: string;
        setId: string;
        weight: number;
        reps: number;
      }>,
    ) {
      const { exerciseId, setId, reps, weight } = action.payload;
      oldState.sets[exerciseId].forEach((set) => {
        if (set.id === setId) {
          set.reps = reps;
          set.weight = weight;
          set.isCompleted = true;
        }
      });
    },
    editWorkoutSet(
      oldState,
      action: PayloadAction<{
        exerciseId: string;
        setId: string;
      }>,
    ) {
      const { exerciseId, setId } = action.payload;
      oldState.sets[exerciseId].forEach((set) => {
        if (set.id === setId) {
          set.isCompleted = false;
        }
      });
    },
    deleteWorkoutSet(
      oldState,
      action: PayloadAction<{
        exerciseId: string;
        setId: string;
      }>,
    ) {
      const { exerciseId, setId } = action.payload;
      const indexToDelete = oldState.sets[exerciseId].findIndex(
        (set) => set.id === setId,
      );
      if (indexToDelete === -1) {
        return oldState;
      }
      oldState.sets[exerciseId].splice(indexToDelete, 1);
    },
  },
});

export const {
  startWorkout,
  deleteWorkout,
  completeWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  replaceExerciseFromWorkout,
  updateWorkoutDetails,
  addSetToWorkoutExercise,
  compleateWorkoutSet,
  editWorkoutSet,
  deleteWorkoutSet,
} = workoutSlice.actions;

export default workoutSlice.reducer;

export function generateRandomId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function generateInitialWorkingExerciseSet() {
  return { id: generateRandomId(), isCompleted: false, weight: 0, reps: 0 };
}

export function setsSelector(exerciseId: string) {
  return createSelector(
    [(state: RootState) => state.workout.sets],
    (s) => s[exerciseId],
  );
}
