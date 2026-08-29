import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Exercise } from "./exerciseReducer";

type WorkoutStatus = "completed" | "in-progress" | "deleted" | null;

export interface WorkoutState {
  id: string;
  planId: string;
  name: string;
  status: WorkoutStatus;
  startDate: string;
  endDate: string;
  notes: string;
  exercises: Exercise[];
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

const initialState: { workouts: WorkoutState[] } = {
  workouts: [],
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    startWorkout: (oldState) => {
      return {
        workouts: [
          ...oldState.workouts,
          {
            ...emptyWorkout,
            id: generateRandomId(),
            name: "Workout on the fly",
            status: "in-progress",
            startDate: new Date().toISOString(),
          },
        ],
      };
    },
    deleteWorkout: (oldState, action: PayloadAction<string>) => {
      return {
        workouts: oldState.workouts.map((workout) =>
          updateStatus(workout, action.payload, "deleted"),
        ),
      };
    },
    completeWorkout: (oldState, action: PayloadAction<string>) => {
      return {
        workouts: oldState.workouts.map((workout) =>
          updateStatus(workout, action.payload, "completed"),
        ),
      };
    },
    addExerciseToWorkout: (
      oldState,
      action: PayloadAction<{ workoutId?: string; exercises: Exercise[] }>,
    ) => {
      const { workoutId, exercises } = action.payload;

      if (!workoutId || !exercises.length) {
        return oldState;
      }

      return {
        workouts: oldState.workouts.map((workout) => {
          if (workout.id === workoutId) {
            return {
              ...workout,
              exercises: [...workout.exercises, ...exercises],
            };
          }
          return workout;
        }),
      };
    },
  },
});

export const {
  startWorkout,
  deleteWorkout,
  completeWorkout,
  addExerciseToWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;

function generateRandomId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function updateStatus(
  workout: WorkoutState,
  id: string,
  newStatus: WorkoutStatus,
): WorkoutState {
  if (workout.id === id) {
    return {
      ...workout,
      status: newStatus,
    };
  }
  return workout;
}
