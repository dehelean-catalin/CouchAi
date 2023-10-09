export type Exercise = {
	id: string;
	name: string;
	instructions: string;
	category: ExerciseCategory;
	movementType: ExerciseType;

	mainBodyPart: MainBodyPart;
	mainMuscleGroup: MainMuscleGroup;
	secondaryMuscleGroup: SecondaryMuscleGroup[];

	equipment: Equipment;
	equipmentRequired: EquipmentRequired[];

	custom: boolean;
	deleted: boolean;
	authorId?: string;
	standardResolutionUrl: string | null;
	thumbnailUrl: string | null;
};

export enum ExerciseCategory {
	WeightAndReps = "Weight and Reps",
	Reps = "Reps",
	DistanceAndTime = "Distance and Time",
	Time = "Time",
}

export type ExerciseType = "compound" | "isolation";

export type MainBodyPart =
	| "Arms"
	| "Legs"
	| "Shoulders"
	| "Back"
	| "Chest"
	| "Abs";

export enum MainMuscleGroup {
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

export type SecondaryMuscleGroup = {
	id: string;
	name: MainMuscleGroup;
};

export type Equipment =
	| "Barbell"
	| "Dumbbell"
	| "Machine"
	| "Bar"
	| "Parallel Bars"
	| "Free Weight"
	| "Cable Machine";

export type EquipmentRequired = { category: string; name: string };
