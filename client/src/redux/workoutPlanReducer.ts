import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WorkoutPlan } from "../models/workoutModel";

export interface WorkoutPlanState {
	workoutPlans: WorkoutPlan[];
}

const initialState: WorkoutPlanState = {
	workoutPlans: [],
};

export const workoutPlanSlice = createSlice({
	name: "workoutPlan",
	initialState,
	reducers: {
		initializeWorkoutPlans: (state, action: PayloadAction<WorkoutPlan[]>) => {
			action.payload.forEach((workout) => state.workoutPlans.push(workout));
		},

		createWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
			state.workoutPlans.push(action.payload);
		},

		deleteWorkoutPlan: (state, action: PayloadAction<string>) => {
			delete state.workoutPlans[action.payload];
		},
	},
});

export const { createWorkoutPlan, deleteWorkoutPlan, initializeWorkoutPlans } =
	workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
