import {
	WorkoutSession,
	WorkoutSessionExercise,
} from "@/model/workoutSessionModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ActiveWorkoutSessionState = {
	data: WorkoutSession[];
};

const initialState: ActiveWorkoutSessionState = {
	data: [],
};

const activeWorkoutSessionSlice = createSlice({
	name: "activeWorkoutSession",
	initialState,
	reducers: {
		startWorkout: (state, action: PayloadAction<WorkoutSession>) => {
			state.data.push(action.payload);
		},
		addExercise: (
			state,
			action: PayloadAction<{ id: string; data: WorkoutSessionExercise[] }>
		) => {
			const up = state.data.find((d) => d.id === action.payload.id);
			action.payload.data.forEach((item) =>
				up?.workoutSessionExercises.push(item)
			);
		},
		finishWorkout: (state, action: PayloadAction<number>) => {
			state.data.splice(action.payload, 1);
		},
	},
});

export const { actions: activeWorkoutSessionActions } =
	activeWorkoutSessionSlice;

export default activeWorkoutSessionSlice.reducer;
