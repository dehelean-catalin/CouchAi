import { Exercise } from "./exerciseModel";

export type WorkoutPlan = {
	id: string;
	name: string;
	thumbnailURL: string;
	description: string;
	workoutDays: { [key: string]: WorkoutDay };
};

export type WorkoutDay = {
	id: string;
	name: string;
	exercises: { [key: string]: WorkoutExercise };
};

export type WorkoutExercise = {
	id: string;
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
