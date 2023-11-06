import { Exercise } from "@/model/exerciseModel";
import {
	WorkoutSession,
	WorkoutSessionExercise,
} from "@/model/workoutSessionModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

type ActiveWorkoutSessionState = {
	data: WorkoutSession[];
	exercises: { [key: string]: WorkoutSessionExercise };
};

const initialState: ActiveWorkoutSessionState = {
	data: [],
	exercises: {},
};

const activeWorkoutSessionSlice = createSlice({
	name: "activeWorkoutSession",
	initialState,
	reducers: {
		startWorkout: (state, action: PayloadAction<WorkoutSession>) => {
			state.data.push(action.payload);
		},
		addExercises: (state, action: PayloadAction<string>) => {
			const up = state.data.find((d) => d.id === action.payload);

			Object.values(state.exercises).forEach((item) =>
				up?.workoutSessionExercises.push(item)
			);

			state.exercises = initialState.exercises;
		},
		replaceExercise: (
			state,
			action: PayloadAction<{
				id: string;
				exerciseId: string;
				exercise: Exercise;
			}>
		) => {
			const { exercise } = action.payload;
			const id = uuid.v4().toString();
			console.log(action.payload.id, action.payload.exerciseId);

			const index = state.data.findIndex(
				(session) => session.id === action.payload.id
			);

			const exerciseIndex = state.data[index].workoutSessionExercises.findIndex(
				(exercise) => exercise.id === action.payload.exerciseId
			);

			const newExercise: WorkoutSessionExercise = {
				id,
				exercise,
				workoutSessionSets: [
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 1,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 2,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 3,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 4,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
				],
				supersetExercises: [],
			};

			state.data[index].workoutSessionExercises.splice(
				exerciseIndex,
				1,
				newExercise
			);
		},
		deleteExercise: (
			state,
			action: PayloadAction<{ id: string; exerciseId: string }>
		) => {
			const index = state.data.findIndex((d) => d.id === action.payload.id);
			const exerciseIndex = state.data[index].workoutSessionExercises.findIndex(
				(d) => d.id === action.payload.exerciseId
			);
			state.data[index].workoutSessionExercises.splice(exerciseIndex, 1);
		},
		finishWorkout: (state, action: PayloadAction<number>) => {
			state.data.splice(action.payload, 1);
		},

		// EXERCISES

		addExercise: (state, action: PayloadAction<Exercise>) => {
			const id = uuid.v4().toString();
			const exercise = action.payload;

			const newExercise: WorkoutSessionExercise = {
				id,
				exercise,
				workoutSessionSets: [
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 1,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 2,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 3,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
					{
						id: uuid.v4().toString(),
						isComplete: false,
						measurementUnit: "kg",
						oneRepMax: 0,
						reps: 0,
						weight: 0,
						restTime: 90,
						set: 4,
						untilFailure: false,
						warmUp: false,
						rir: null,
					},
				],
				supersetExercises: [],
			};

			state.exercises[id] = newExercise;
		},

		removeExercise: (state, action: PayloadAction<string>) => {
			delete state.exercises[action.payload];
		},
	},
});

export const { actions: activeWorkoutSessionActions } =
	activeWorkoutSessionSlice;

export default activeWorkoutSessionSlice.reducer;
