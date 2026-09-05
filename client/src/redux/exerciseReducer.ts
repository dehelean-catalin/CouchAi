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

enum MuscleName {
  // NECK,
  // TRAPS,
  SHOULDERS = "Shoulders",
  CHEST = "Chest",
  BICEPS = "Biceps",
  TRICEPS = "Triceps",
  // FOREARMS,
  // LATS,
  // UPPER_BACK,
  // LOWER_BACK,
  // GLUTES,
  // ADDUCTORS,
  // ABDUCTORS,
  // QUADRICEPS,
  // HAMSTRINGS,
  // CALVES,
  // ABDOMINALS,
  // CARDIO,
}

interface MuscleGroup {
  id: string;
  name: MuscleName;
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
      primaryMuscleGroups: [{ id: "1", name: MuscleName.CHEST }],
      secondaryMuscleGroups: [
        { id: "2", name: MuscleName.TRICEPS },
        { id: "3", name: MuscleName.SHOULDERS },
      ],
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
      primaryMuscleGroups: [{ id: "1", name: MuscleName.CHEST }],
      secondaryMuscleGroups: [
        { id: "2", name: MuscleName.TRICEPS },
        { id: "3", name: MuscleName.SHOULDERS },
      ],
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
      primaryMuscleGroups: [{ id: "1", name: MuscleName.CHEST }],
      secondaryMuscleGroups: [
        { id: "2", name: MuscleName.TRICEPS },
        { id: "3", name: MuscleName.SHOULDERS },
      ],
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
      primaryMuscleGroups: [{ id: "1", name: MuscleName.CHEST }],
      secondaryMuscleGroups: [
        { id: "2", name: MuscleName.TRICEPS },
        { id: "3", name: MuscleName.SHOULDERS },
      ],
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
  ],
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {},
});

export default exerciseSlice.reducer;
