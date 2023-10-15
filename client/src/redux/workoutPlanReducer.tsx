import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WorkoutPlan } from "../models/workoutModel";

export interface WorkoutPlanState {
	workoutPlans: { [key: string]: WorkoutPlan };
	savedWorkoutPlans: { [key: string]: WorkoutPlan };
}

const initialState: WorkoutPlanState = {
	workoutPlans: {},
	savedWorkoutPlans: {},
};

export const workoutPlanSlice = createSlice({
	name: "workoutPlan",
	initialState,
	reducers: {
		createWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
			const id = action.payload.id;

			state.savedWorkoutPlans[id] = action.payload;
		},
	},
});

export const { createWorkoutPlan } = workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
