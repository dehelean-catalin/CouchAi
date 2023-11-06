import { WorkoutPlan } from "@/model/workoutModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WorkoutPlanState {
	workoutPlans: { [key: string]: WorkoutPlan };
}

const initialState: WorkoutPlanState = {
	workoutPlans: {},
};

export const workoutPlanSlice = createSlice({
	name: "workoutPlan",
	initialState,
	reducers: {
		initializeWorkoutPlans: (state, action: PayloadAction<WorkoutPlan[]>) => {
			action.payload.forEach(
				(workout) => (state.workoutPlans[workout.id] = workout)
			);
		},

		createWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
			console.log(action.payload.id);
			state.workoutPlans[action.payload.id] = action.payload;
		},

		deleteWorkoutPlan: (state, action: PayloadAction<string>) => {
			delete state.workoutPlans[action.payload];
		},
	},
});

export const { createWorkoutPlan, deleteWorkoutPlan, initializeWorkoutPlans } =
	workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
