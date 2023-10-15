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
	exercises: any[];
};

export type WorkoutExercise = {};

export type WorkoutSet = {};
