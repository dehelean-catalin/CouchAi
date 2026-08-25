import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SetState {
  id: string;
  type: "weight" | "cardio" | "body-weight";
  weight: number;
  reps: number;
  time: number;
}

interface ExerciseState {
  name: string;
  type: "set" | "super-set";
  sets: SetState[];
}

type WorkoutStatus = "completed" | "in-progress" | "deleted" | null;

export interface WorkoutState {
  id: string;
  planId: string;
  name: string;
  status: WorkoutStatus;
  startDate: string;
  endDate: string;
  notes: string;
  exercises: ExerciseState[];
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
    startWorkout: (state) => {
      return {
        workouts: [
          ...state.workouts,
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
  },
});

export const { startWorkout, deleteWorkout, completeWorkout } =
  workoutSlice.actions;

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
