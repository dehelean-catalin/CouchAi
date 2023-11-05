import { EquipmentRequired } from "./equipmentModel";

export type Exercise = {
	id: string;
	name: string;
	instructions: string;
	category: ExerciseCategory;
	compoundMovement: boolean;

	equipmentRequired: EquipmentRequired[];
	mainBodyPart: MuscleGroup;
	primaryMuscleGroup: MuscleGroup[];
	secondaryMuscleGroup: MuscleGroup[];

	custom: boolean;
	deleted: boolean;
	standardResolutionUrl: string;
	thumbnailUrl: string;
};

export const exerciseCategoryRecord = [
	"weight_and_Reps",
	"reps",
	"distance_and_time",
	"time",
] as const;

type ExerciseTuple = typeof exerciseCategoryRecord;
export type ExerciseCategory = ExerciseTuple[number];

export const muscleRecord = [
	"Chest",
	"Shoulders",
	"Triceps",
	"Middle Chest",
	"Lower Back",
	"Glutes",
	"Lats",
	"Biceps",
	"Traps",
	"Middle Back",
	"Hamstrings",
	"Front Deltoids",
	"Abs",
	"Obliques",
	"Upper Chest",
	"Side Deltoids",
	"Quadriceps",
	"Calves",
	"Lower Chest",
	"Lower Abs",
	"Rear Deltoids",
	"Adductors",
	"Abductors",
	"Triceps Long Head",
	"Triceps Lateral Head",
	"Forearms",
	"Brachialis",
	"Biceps Long Head",
	"Biceps Short Head",
	"Soleus",
	"Gastrocnemius",
	"Upper Abs",
	"Anterior Forearms",
	"Cardio",
	"Posterior Forearms",
] as const;

type MuscleTuple = typeof muscleRecord;
export type MuscleGroup = MuscleTuple[number];

export type MuscleRecord = {
	id: string;
	name: MuscleGroup;
};
