import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FindAllByCategoryResponse, WorkoutPlan } from "../models/workoutModel";

export interface WorkoutPlanState {
	gainStrength: WorkoutPlan[];
	buildMuscle: WorkoutPlan[];
	loseFat: WorkoutPlan[];
	homeWorkouts: WorkoutPlan[];
	singleWorkouts: WorkoutPlan[];
	savedWorkoutPlans: { [key: string]: WorkoutPlan };
}

const initialState: WorkoutPlanState = {
	gainStrength: [],
	buildMuscle: [],
	loseFat: [],
	homeWorkouts: [],
	singleWorkouts: [],
	savedWorkoutPlans: {},
};

export const workoutPlanSlice = createSlice({
	name: "workoutPlan",
	initialState,
	reducers: {
		initializeWorkoutPlans: (
			state,
			action: PayloadAction<FindAllByCategoryResponse>
		) => {
			state.buildMuscle = action.payload.buildMuscle;
			state.gainStrength = action.payload.gainStrength;
			state.homeWorkouts = action.payload.homeWorkouts;
			state.loseFat = action.payload.loseFat;
			state.singleWorkouts = action.payload.singleWorkouts;
		},

		createWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
			const id = action.payload.id;

			state.savedWorkoutPlans[id] = action.payload;
		},

		deleteWorkoutPlan: (state, action: PayloadAction<string>) => {
			delete state.savedWorkoutPlans[action.payload];
		},
	},
});

export const { createWorkoutPlan, deleteWorkoutPlan, initializeWorkoutPlans } =
	workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;
