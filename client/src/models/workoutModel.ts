import { Exercise } from "./exerciseModel";

export type WorkoutPlan = {
	id: string;
	name: string;
	thumbnailURL: string;
	description: string;
	workoutDays: WorkoutDay[];
};

export type WorkoutDay = {
	id: string;
	name: string;
	position: number;
	exercises: WorkoutExercise[];
};

export type WorkoutExercise = {
	id: string;
	position: number;
	exercise: Exercise;
	workoutSets: WorkoutSet[];
};

export type WorkoutSet = {
	id: string;
	minReps: number;
	maxReps: number;
	restTime: number;
	rir: number;
	untilFailure: boolean;
	warmUp: boolean;
};
