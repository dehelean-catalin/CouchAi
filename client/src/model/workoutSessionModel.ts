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
	position: number;
	supersetExercises: WorkoutSessionSet[];
	workoutSessionSets: WorkoutSessionSet[];
};

export type WorkoutSessionSet = {
	id: string;
	isComplete: true;
	measurementUnit: "kg" | "lbs";
	oneRepMax: number;
	reps: number;
	weight: number;
	restTime: number;
	set: number;
	untilFailure: boolean;
	warmUp: boolean;
};
