import { createSlice } from "@reduxjs/toolkit";

export interface Exercise {
  id: string;
  name: string;
  instructions: string;
  category: ExerciseCategory;
  thumbnailUrl: string;
  standardResolutionUrl: string;
  requiredEquipmentIds: string[];
  primaryMuscleGroups: MuscleGroup[];
  secondaryMuscleGroups: MuscleGroup[];
  isCreatedByUser: boolean;
}

enum ExerciseCategory {
  WEIGHT_AND_REPS,
  REPS,
  TIME,
  TIME_AND_DISTANCE,
}

interface RequiredEquipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  thumbnailUrl: string;
}

enum EquipmentCategory {
  MACHINE,
  BARBELL,
  DUMBELL,
  RESISTANCE_BANDS,
  KETTLEBELL,
  BENCH,
  BODY_WEIGHT,
  OTHER,
}

enum MuscleGroup {
  // NECK,
  // TRAPS,
  Shoulders = "Shoulders",
  Chest = "Chest",
  Biceps = "Biceps",
  Triceps = "Triceps",
  // FOREARMS,
  // LATS,
  // UPPER_BACK,
  // LOWER_BACK,
  Glutes = "Glutes",
  Adductors = "Adductors",
  Abductors = "Abductors",
  Quadriceps = "Quadriceps",
  Hamstrings = "Hamstrings",
  Calves = "Calves",
  Abdominals = "Abdominals",
  // CARDIO,
}

export interface ExerciseState {
  value: Exercise[];
  equipment: RequiredEquipment[];
}

const initialState: ExerciseState = {
  value: [
    {
      id: "1",
      name: "Barbell Bench Press",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/barbell-bench-press/720.gif"),
      thumbnailUrl: require("../../assets/exercises/barbell-bench-press/180.gif"),
      requiredEquipmentIds: ["1", "2"],
      primaryMuscleGroups: [MuscleGroup.Chest],
      secondaryMuscleGroups: [MuscleGroup.Triceps, MuscleGroup.Shoulders],
      isCreatedByUser: false,
    },
    {
      id: "2",
      name: "Dumbbell Bench Press",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/dumbbell-bench-press/180.gif"),
      thumbnailUrl: require("../../assets/exercises/dumbbell-bench-press/720.gif"),
      requiredEquipmentIds: ["1", "3"],
      primaryMuscleGroups: [MuscleGroup.Chest],
      secondaryMuscleGroups: [MuscleGroup.Triceps, MuscleGroup.Shoulders],
      isCreatedByUser: false,
    },
    {
      id: "3",
      name: "Incline Dumbbell Bench Press",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/incline-dumbbell-bench-press/180.gif"),
      thumbnailUrl: require("../../assets/exercises/incline-dumbbell-bench-press/720.gif"),
      requiredEquipmentIds: ["1", "3"],
      primaryMuscleGroups: [MuscleGroup.Chest],
      secondaryMuscleGroups: [MuscleGroup.Triceps, MuscleGroup.Shoulders],
      isCreatedByUser: false,
    },
    {
      id: "4",
      name: "Incline Barbell Bench Press",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/incline-barbell-bench-press/180.gif"),
      thumbnailUrl: require("../../assets/exercises/incline-barbell-bench-press/720.gif"),
      requiredEquipmentIds: ["1", "2"],
      primaryMuscleGroups: [MuscleGroup.Chest],
      secondaryMuscleGroups: [MuscleGroup.Triceps, MuscleGroup.Shoulders],
      isCreatedByUser: false,
    },
    {
      id: "5",
      name: "Seated Leg Curl",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/seated-leg-curl/180.gif"),
      thumbnailUrl: require("../../assets/exercises/seated-leg-curl/720.gif"),
      requiredEquipmentIds: ["4"],
      primaryMuscleGroups: [MuscleGroup.Hamstrings],
      secondaryMuscleGroups: [MuscleGroup.Calves],
      isCreatedByUser: false,
    },
    {
      id: "6",
      name: "Lying Leg Curl",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/lying-leg-curl/180.gif"),
      thumbnailUrl: require("../../assets/exercises/lying-leg-curl/720.gif"),
      requiredEquipmentIds: ["4"],
      primaryMuscleGroups: [MuscleGroup.Hamstrings],
      secondaryMuscleGroups: [MuscleGroup.Calves, MuscleGroup.Glutes],
      isCreatedByUser: false,
    },
    {
      id: "7",
      name: "Hack Squat Machine",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/hack-squat-machine/180.gif"),
      thumbnailUrl: require("../../assets/exercises/hack-squat-machine/720.gif"),
      requiredEquipmentIds: ["4"],
      primaryMuscleGroups: [MuscleGroup.Quadriceps],
      secondaryMuscleGroups: [
        MuscleGroup.Hamstrings,
        MuscleGroup.Glutes,
        MuscleGroup.Adductors,
      ],
      isCreatedByUser: false,
    },
    {
      id: "8",
      name: "Barbell Romanian Deadlift",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/barbell-romanian-deadlift/180.gif"),
      thumbnailUrl: require("../../assets/exercises/barbell-romanian-deadlift/720.gif"),
      requiredEquipmentIds: ["1"],
      primaryMuscleGroups: [MuscleGroup.Hamstrings],
      secondaryMuscleGroups: [
        MuscleGroup.Glutes,
        MuscleGroup.Calves,
        MuscleGroup.Quadriceps,
      ],
      isCreatedByUser: false,
    },
    {
      id: "9",
      name: "Seated Calf Raise",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/seated-calf-raise/180.gif"),
      thumbnailUrl: require("../../assets/exercises/seated-calf-raise/720.gif"),
      requiredEquipmentIds: ["4"],
      primaryMuscleGroups: [MuscleGroup.Calves],
      secondaryMuscleGroups: [],
      isCreatedByUser: false,
    },
    {
      id: "10",
      name: "Seated Cable Cruch",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/seated-cable-crunch/180.gif"),
      thumbnailUrl: require("../../assets/exercises/seated-cable-crunch/720.gif"),
      requiredEquipmentIds: ["4"],
      primaryMuscleGroups: [MuscleGroup.Abdominals],
      secondaryMuscleGroups: [],
      isCreatedByUser: false,
    },
    {
      id: "11",
      name: "Thigh Adductor",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/thigh-adductor/180.gif"),
      thumbnailUrl: require("../../assets/exercises/thigh-adductor/720.gif"),
      requiredEquipmentIds: ["4"],
      primaryMuscleGroups: [MuscleGroup.Adductors],
      secondaryMuscleGroups: [],
      isCreatedByUser: false,
    },
    {
      id: "12",
      name: "Thigh Abductor",
      instructions: "",
      category: ExerciseCategory.WEIGHT_AND_REPS,
      standardResolutionUrl: require("../../assets/exercises/thigh-abductor/180.gif"),
      thumbnailUrl: require("../../assets/exercises/thigh-abductor/720.gif"),
      requiredEquipmentIds: ["4"],
      primaryMuscleGroups: [MuscleGroup.Abductors],
      secondaryMuscleGroups: [],
      isCreatedByUser: false,
    },
  ],
  equipment: [
    {
      id: "1",
      name: "barbell",
      category: EquipmentCategory.BARBELL,
      thumbnailUrl: "",
    },
    {
      id: "2",
      name: "bench",
      category: EquipmentCategory.BODY_WEIGHT,
      thumbnailUrl: "",
    },
    {
      id: "3",
      name: "dumbell",
      category: EquipmentCategory.DUMBELL,
      thumbnailUrl: "",
    },
    {
      id: "4",
      name: "machine",
      category: EquipmentCategory.MACHINE,
      thumbnailUrl: "",
    },
  ],
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {},
});

export default exerciseSlice.reducer;
