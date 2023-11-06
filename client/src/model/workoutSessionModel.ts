import { Exercise } from "./exerciseModel";

export type WorkoutSession = {
	id: string;
	name: string;
	isComplete: boolean;
	startDate: number;
	endDate: number | null;
	workoutSessionExercises: WorkoutSessionExercise[];
};

export type WorkoutSessionExercise = {
	id: string;
	exercise: Exercise;
	supersetExercises: WorkoutSessionSet[];
	workoutSessionSets: WorkoutSessionSet[];
};

export type WorkoutSessionSet = {
	id: string;
	isComplete: boolean;
	measurementUnit: "kg" | "lbs";
	oneRepMax: number;
	reps: number;
	weight: number;
	restTime: number;
	set: number;
	rir: number | null;
	untilFailure: boolean;
	warmUp: boolean;
};
