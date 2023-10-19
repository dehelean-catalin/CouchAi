import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { Exercise } from "../models/exerciseModel";
import { WorkoutExercise, WorkoutPlan } from "../models/workoutModel";

export interface WorkoutFormState {
	workoutPlan: WorkoutPlan;
	exercises: { [key: string]: WorkoutExercise };
}

const initialState: WorkoutFormState = {
	workoutPlan: {
		id: uuid.v4().toString(),
		name: "",
		thumbnailURL: "",
		description: "",
		workoutDays: {},
	},
	exercises: {},
};

const workoutFormSlice = createSlice({
	name: "workoutForm",
	initialState,
	reducers: {
		initializeWorkout: (state) => {
			const workoutId = uuid.v4().toString();

			const newWorkoutDays = {
				...state.workoutPlan.workoutDays,
				[workoutId]: {
					id: workoutId,
					name: "",
					exercises: {},
				},
			};

			return {
				...state,
				workoutPlan: {
					...state.workoutPlan,
					workoutDays: newWorkoutDays,
				},
			};
		},
		setPlanName: (state, action: PayloadAction<string>) => {
			state.workoutPlan.name = action.payload;
		},

		setWorkoutName: (
			state,
			action: PayloadAction<{ id: string; name: string }>
		) => {
			const id = action.payload.id;
			const name = action.payload.name;

			state.workoutPlan.workoutDays[id].name = name;
		},

		addWorkoutToPlan: (state) => {
			const id = new Date().getTime().toString();

			state.workoutPlan.workoutDays[id] = {
				id,
				name: "",
				exercises: {},
			};
		},

		addExercisesToWorkout: (state, action: PayloadAction<string>) => {
			state.workoutPlan.workoutDays[action.payload].exercises = {
				...state.workoutPlan.workoutDays[action.payload].exercises,
				...state.exercises,
			};
			state.exercises = {};
		},

		reorderExercises: (
			state,
			action: PayloadAction<{ id: string; data: Exercise }>
		) => {
			state.workoutPlan.workoutDays[action.payload.id].exercises = {};
			state.exercises = {};
		},

		addExercise: (state, action: PayloadAction<Exercise>) => {
			const id = uuid.v4().toString();
			const newExercises = {
				id,
				exercise: action.payload,
				workoutSets: [
					{
						id: uuid.v4().toString(),
						minReps: 0,
						maxReps: 0,
						restTime: 90,
						rir: null,
						untilFailure: false,
						warmUp: false,
					},
					{
						id: uuid.v4().toString(),
						minReps: 0,
						maxReps: 0,
						restTime: 90,
						rir: null,
						untilFailure: false,
						warmUp: false,
					},
					{
						id: uuid.v4().toString(),
						minReps: 0,
						maxReps: 0,
						restTime: 90,
						rir: null,
						untilFailure: false,
						warmUp: false,
					},
					{
						id: uuid.v4().toString(),
						minReps: 0,
						maxReps: 0,
						restTime: 90,
						rir: null,
						untilFailure: false,
						warmUp: false,
					},
				],
			};
			state.exercises[id] = newExercises;
		},

		removeExercise: (state, action: PayloadAction<string>) => {
			delete state.exercises[action.payload];
		},

		deleteWorkoutExercise: (
			state,
			action: PayloadAction<{ id: string; exerciseId: string }>
		) => {
			delete state.workoutPlan.workoutDays[action.payload.id].exercises[
				action.payload.exerciseId
			];
		},

		clearState: (state) => {
			state.workoutPlan = {
				id: uuid.v4().toString(),
				name: "",
				thumbnailURL: "",
				description: "",
				workoutDays: {},
			};
		},
	},
});

export const { actions: workoutFormActions } = workoutFormSlice;

export default workoutFormSlice.reducer;
