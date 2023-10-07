import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Exercise } from "../models/exerciseModels";

export interface ExerciseState {
	value: { [key: string]: Exercise };
}

const initialState: ExerciseState = {
	value: {},
};

export const exerciseSlice = createSlice({
	name: "exercise",
	initialState,
	reducers: {
		addExercise: (state, action: PayloadAction<Exercise>) => {
			const id = action.payload.id;
			state.value[id] = action.payload;
		},
		updateExercise: (state, action: PayloadAction<Exercise>) => {
			const id = action.payload.id;
			state.value[id] = action.payload;
		},
		deleteExercise: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			delete state.value[id];
		},
	},
});

export const { addExercise } = exerciseSlice.actions;

export default exerciseSlice.reducer;
