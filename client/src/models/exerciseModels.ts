export type Exercise = {
	id: string;
	picture: any | null;
	name: string;
	instructions: string;
	exerciseCategory: ExerciseCategory;
	targetMuscle: TargetMuscle;
	authorId: String;
};

export enum TargetMuscle {
	Neck = "Neck",
	Traps = "Traps",
	Shoulders = "Shoulders",
	Biceps = "Biceps",
	Triceps = "Triceps",
	Forearms = "Forearms",
	Chest = "Chest",
	Abs = "Abs",
	Lats = "Lats",
	MiddleBack = "MiddleBack",
	LowerBack = "LowerBack",
	Glutes = "Glutes",
	Aductors = "Aductors",
	Qudriceps = "Qudriceps",
	Hamstring = "Hamstring",
	Calves = "Calves",
	Cardio = "Cardio",
	None = "None",
}

export enum ExerciseCategory {
	WeightAndReps = "WeightAndReps",
	Reps = "Reps",
	DistanceAndTime = "DistanceAndTime",
	Time = "Time",
}
