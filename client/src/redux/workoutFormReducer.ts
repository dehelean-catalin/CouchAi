import { Exercise } from "@/model/exerciseModel";
import { WorkoutExercise, WorkoutPlan } from "@/model/workoutModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

export type EmptyObj = Record<PropertyKey, never>;

export interface WorkoutFormState {
	workoutPlan: WorkoutPlan;
	exercises: { [key: string]: WorkoutExercise };
	showDialog: boolean;
}

const initialState: WorkoutFormState = {
	workoutPlan: {
		id: "",
		name: "",
		thumbnailURL: "",
		premium: false,
		daysPerWeek: null,
		custom: true,
		mainGoal: "gain_muscle",
		trainingLevel: "",
		description: "",
		workoutDays: {},
	},
	exercises: {},
	showDialog: false,
};

const workoutFormSlice = createSlice({
	name: "workoutForm",
	initialState,
	reducers: {
		initializeWorkout: (state) => {
			const id = uuid.v4().toString();
			const workoutId = uuid.v4().toString();

			state.workoutPlan.id = id;
			state.workoutPlan.workoutDays = {
				[workoutId]: {
					id: workoutId,
					name: "",
					workoutExercises: {},
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
				workoutExercises: {},
			};
		},

		deleteWorkout: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			delete state.workoutPlan.workoutDays[id];
		},

		addExercisesToWorkout: (state, action: PayloadAction<string>) => {
			state.workoutPlan.workoutDays[action.payload].workoutExercises = {
				...state.workoutPlan.workoutDays[action.payload].workoutExercises,
				...state.exercises,
			};
			state.exercises = {};
		},

		deleteWorkoutExercise: (
			state,
			action: PayloadAction<{ id: string; exerciseId: string }>
		) => {
			delete state.workoutPlan.workoutDays[action.payload.id].workoutExercises[
				action.payload.exerciseId
			];
		},

		//EXERCISE SELECTION

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

		clearState: (state) => initialState,

		// DIALOG CONTROL

		toggleDialog: (state, action: PayloadAction<boolean>) => {
			state.showDialog = action.payload;
		},
	},
});

export const { actions: workoutFormActions } = workoutFormSlice;

export default workoutFormSlice.reducer;
