import { Exercise } from "./exerciseModel";

export type FindAllByCategoryResponse = {
	gainStrength: WorkoutPlan[];
	buildMuscle: WorkoutPlan[];
	loseFat: WorkoutPlan[];
	homeWorkouts: WorkoutPlan[];
	singleWorkouts: any[];
};

export type WorkoutPlan = {
	id: string;
	name: string;
	thumbnailURL: string;
	description: string;
	daysPerWeek: number;
	mainGoal: string;
	trainingLevel: String;
	custom: boolean;
	premium: boolean;
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
