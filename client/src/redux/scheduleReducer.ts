import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WorkoutPlan } from "./../models/workoutModel";

type ScheduleState = {
	data: WorkoutPlan;
};

const initialState: ScheduleState = {
	data: null,
};

const scheduleSlice = createSlice({
	name: "schedule",
	initialState,
	reducers: {
		startSchedule: (state, action: PayloadAction<WorkoutPlan>) => {
			state.data = action.payload;
		},
	},
});

export const { actions: scheduleActions } = scheduleSlice;

export default scheduleSlice.reducer;
